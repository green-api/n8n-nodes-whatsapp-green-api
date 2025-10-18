import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function receiveNotification(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const receiveTimeout = this.getNodeParameter('receiveTimeout', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        let url = `https://api.green-api.com/waInstance${credentials.idInstance}/lastIncomingMessages/${credentials.apiTokenKey}`;
        if (receiveTimeout) {url = url + '?receiveTimeout=' + receiveTimeout}

        const response = await this.helpers.request({
            method: 'GET',
            url:  url,
            headers: { 'Content-Type': 'application/json' },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}

export async function deleteNotification(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const receiptId = this.getNodeParameter('receiptId', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'GET',
            url:  `https://api.green-api.com/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiTokenKey}/${receiptId}`,
            headers: { 'Content-Type': 'application/json' },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}