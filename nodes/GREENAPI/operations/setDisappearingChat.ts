import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function setDisappearingChat(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i, '') as string;
        const ephemeralExpiration = this.getNodeParameter('ephemeralExpiration', i, '') as number;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/setDisappearingChat/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'chatId': chatId,
                    'ephemeralExpiration': ephemeralExpiration
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
