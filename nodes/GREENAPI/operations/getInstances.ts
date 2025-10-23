import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function getInstances(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];
    
    for (let i = 0; i < items.length; i++) {
        const credentials = await this.getCredentials('greenApiPartnerAuthApi') as {
            partnerToken: string;
        };
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/partner/getInstances/${credentials.partnerToken}`,
            headers: { 'Content-Type': 'application/json' },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
