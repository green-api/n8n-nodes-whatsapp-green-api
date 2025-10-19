import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import path from 'path';

import mime from 'mime-types';
export async function setProfilePicture(this: IExecuteFunctions, items: INodeExecutionData[]) {
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

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/setProfilePicture/${credentials.apiTokenKey}`,
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
			rejectUnauthorized: false,
        });

        returnData.push(response);
    }

    return returnData;
}