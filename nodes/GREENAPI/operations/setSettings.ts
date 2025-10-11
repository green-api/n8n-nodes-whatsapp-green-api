import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function setSettings(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const groupId = this.getNodeParameter('groupId', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/setSettings/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'groupId': groupId,
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}