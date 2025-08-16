import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function checkWhatsapp(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const phoneNumber = this.getNodeParameter('phoneNumber', i, '') as string;
        const credentials = await this.getCredentials('greenApiCredentials') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/checkWhatsapp/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'phoneNumber': phoneNumber,
                },
            json: true,
        });
        returnData.push(response);
    }

    return returnData;
}
