import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function readChat(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i, '') as string;
        const idMessage = this.getNodeParameter('idMessage', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        let body: any;
        body = {'chatId': chatId};
        if (idMessage){
            body['idMessage']=idMessage;
        }

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/readChat/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body,
            json: true,
        });
        returnData.push(response);        
    }
    return returnData;
}
