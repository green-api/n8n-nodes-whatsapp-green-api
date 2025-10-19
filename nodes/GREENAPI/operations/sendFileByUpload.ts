import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import path from 'path';
import mime from 'mime-types';

export async function sendFileByUpload(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
    const returnData: INodeExecutionData[] = [];
    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i);
        const fileName = this.getNodeParameter('fileName', i);
        const caption = this.getNodeParameter('caption', i);
        const quotedMessageId = this.getNodeParameter('quotedMessageId', i);

        const filePath = this.getNodeParameter('filePath', i);
        const stream = await this.helpers.createReadStream(filePath);
        const filename = path.basename(filePath);
        const contentType = mime.lookup(filename) || 'application/octet-stream';
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://media.green-api.com/waInstance${credentials.idInstance}/sendFileByUpload/${credentials.apiTokenKey}`,
            headers: {
                'GA-Filename': filename
            },
            formData: {
                'chatId': chatId,
                'fileName': fileName,
                'caption': caption,
                'quotedMessageId': quotedMessageId,
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
            rejectUnauthorized: false, // нарушение безопасности, исправить
        });
        returnData.push(response);
    }
    return returnData;
}