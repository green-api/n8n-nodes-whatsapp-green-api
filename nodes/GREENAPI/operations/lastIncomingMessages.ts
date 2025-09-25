import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function lastIncomingMessages(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const minutes = this.getNodeParameter('minutes', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        let url = `https://api.green-api.com/waInstance${credentials.idInstance}/lastIncomingMessages/${credentials.apiTokenKey}`;
        if (minutes) {url = url + '?minutes=' + minutes}

        const response = await this.helpers.request({
            method: 'GET',
            url:  url,
            headers: { 'Content-Type': 'application/json' }
        });

        returnData.push(response);
    }

    return returnData;
}
