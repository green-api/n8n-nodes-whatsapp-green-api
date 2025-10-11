import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function getWaSettings(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'GET',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/getWaSettings/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            json: true,
        });

        returnData.push(response);
    }
    
    return returnData;
}