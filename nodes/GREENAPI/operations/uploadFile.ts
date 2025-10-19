import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

//npm install --save-dev @types/node
import path from 'path';
//npm install mime-types
//npm install --save-dev @types/mime-types
import mime from 'mime-types';
declare const console: any;

export async function uploadFile(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
    const returnData: INodeExecutionData[] = [];
    for (let i = 0; i < items.length; i++) {
        const filePath = this.getNodeParameter('filePath', i);
        const stream = await this.helpers.createReadStream(filePath);
        const filename = path.basename(filePath);
        const contentType = mime.lookup(filename) || 'application/octet-stream';
        console.log(filename)
        console.log(filePath)
        console.log(contentType)
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://media.green-api.com/waInstance${credentials.idInstance}/uploadFile/${credentials.apiTokenKey}`,
            headers: {
                'GA-Filename': filename,
                'Content-Type': contentType,
            },
            body: stream,
            json: true,
            timeout: 60000,
            rejectUnauthorized: false,
        });
        returnData.push(response);
    }
    return returnData;
}