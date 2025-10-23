import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function sendLocation(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i, '') as string;
        const nameLocation = this.getNodeParameter('nameLocation', i, '') as string;
        const address = this.getNodeParameter('address', i, '') as string;    
        const latitude = this.getNodeParameter('latitude', i, '') as number;
        const longitude = this.getNodeParameter('longitude', i, '') as number;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendLocation/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'chatId': chatId,
                    'nameLocation': nameLocation,
                    'address': address,
                    'latitude': latitude,
                    'longitude': longitude
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
