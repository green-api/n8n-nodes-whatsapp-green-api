import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function sendFileByUrl(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i, '') as string;
        const fileName = this.getNodeParameter('fileName', i, '') as string;
        const urlFile = this.getNodeParameter('urlFile', i, '') as string;
        const credentials = await this.getCredentials('GreenApiAuth') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendFileByUrl/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                'chatId': chatId,
                'fileName': fileName,
                'urlFile': urlFile,
            },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
