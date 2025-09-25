import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function getContacts(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const credentials = await this.getCredentials('GreenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'GET',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/getContacts/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' }
        });

        returnData.push(response);
    }

    return returnData;
}
