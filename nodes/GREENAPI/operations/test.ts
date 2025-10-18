import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
declare const console: any;
//npm install --save-dev @types/node
import path from 'path';
//npm install mime-types
//npm install --save-dev @types/mime-types
import mime from 'mime-types';
export async function test(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
    const returnData: INodeExecutionData[] = [];
    //let item: INodeExecutionData;
    for (let i = 0; i < items.length; i++) {
        
        /*
        item = items[i];
        const newItem: INodeExecutionData = {
            json: item.json,
            binary: {},
            pairedItem: {
                item: i,
            },
        };
        
        if (item.binary !== undefined && newItem.binary) {
            Object.assign(newItem.binary, item.binary);
        }
        */

        

        const filePath = this.getNodeParameter('filePath', i);
        const stream = await this.helpers.createReadStream(filePath);
        const filename = path.basename(filePath);
        // mime.lookup / mime.contentType возвращает как "image/jpeg" или false
        const contentType = mime.lookup(filename) || 'application/octet-stream';
        //const dataPropertyName = 'binary';
        //newItem.binary![dataPropertyName] = await this.helpers.prepareBinaryData(stream, filePath);

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://media.green-api.com/waInstance${credentials.idInstance}/uploadFile/${credentials.apiTokenKey}`,
            //url: 'https://a29eebf6860d.ngrok-free.app/webhook-test/6b3bc424-fd88-4877-b87c-50c19e25bd5d',
            headers: {
                'GA-Filename': filename
            },
            formData: {
                file: {
                    value: stream,
                    options: { 
                        filename,
                        contentType, 
                    },
                },
            },
            json: true,
            timeout: 60000,
			rejectUnauthorized: false, // ← можно временно включить для теста
        });

        returnData.push(response);
    }

    return returnData;
}