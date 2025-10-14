import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function deleteInstanceAccount(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const credentials = await this.getCredentials('greenApiPartnerAuthApi') as {
            partnerToken: string;
        };
        const idInstance = this.getNodeParameter('idInstance', i, '') as number;

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/partner/deleteInstanceAccount/${credentials.partnerToken}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                'idInstance': idInstance,
            },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
