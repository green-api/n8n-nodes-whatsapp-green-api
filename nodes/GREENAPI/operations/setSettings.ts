import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function setSettings(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const keys = [
            'settings.webhookUrl',
            'settings.webhookUrlToken',
            'settings.delaySendMessagesMilliseconds',
            'settings.markIncomingMessagesReaded',
            'settings.markIncomingMessagesReadedOnReply',
            'settings.outgoingWebhook',
            'settings.outgoingMessageWebhook',
            'settings.outgoingAPIMessageWebhook',
            'settings.stateWebhook',
            'settings.incomingWebhook',
            'settings.keepOnlineStatus',
            'settings.pollMessageWebhook',
            'settings.incomingCallWebhook',
            'settings.editedMessageWebhook',
            'settings.deletedMessageWebhook',
        ];
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
        const body: Record<string, any> = {};

        for (const key of keys) {
            const value = this.getNodeParameter(key, i, null);

            if (value !== undefined && value !== null) {
                const cleanKey = key.replace(/^settings\./, '');
                body[cleanKey] = typeof value === 'boolean' ? (value ? 'yes' : 'no') : value;
            }
        }
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/setSettings/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body,
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}