//
//not implemented
//

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function setSettings(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const webhookUrl = this.getNodeParameter('webhookUrl', i, '') as string;
        const webhookUrlToken = this.getNodeParameter('webhookUrlToken', i, '') as string;
        const delaySendMessagesMilliseconds = this.getNodeParameter('delaySendMessagesMilliseconds', i, '') as number;
        const markIncomingMessagesReaded = this.getNodeParameter('markIncomingMessagesReaded', i, '') as boolean;
        const markIncomingMessagesReadedOnReply = this.getNodeParameter('markIncomingMessagesReadedOnReply', i, '') as boolean;
        const outgoingWebhook = this.getNodeParameter('outgoingWebhook', i, '') as boolean;
        const outgoingMessageWebhook = this.getNodeParameter('outgoingMessageWebhook', i, '') as boolean;
        const outgoingAPIMessageWebhook = this.getNodeParameter('outgoingAPIMessageWebhook', i, '') as boolean;
        const stateWebhook = this.getNodeParameter('stateWebhook', i, '') as boolean;
        const incomingWebhook = this.getNodeParameter('incomingWebhook', i, '') as boolean;
        const keepOnlineStatus = this.getNodeParameter('keepOnlineStatus', i, '') as boolean;
        const pollMessageWebhook = this.getNodeParameter('pollMessageWebhook', i, '') as boolean;
        const incomingCallWebhook = this.getNodeParameter('incomingCallWebhook', i, '') as boolean;
        const editedMessageWebhook = this.getNodeParameter('editedMessageWebhook', i, '') as boolean;
        const deletedMessageWebhook = this.getNodeParameter('deletedMessageWebhook', i, '') as boolean;

        /*const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };*/

        const response = await this.helpers.request({
            method: 'POST',
            //url: `https://api.green-api.com/waInstance${credentials.idInstance}/setSettings/${credentials.apiTokenKey}`,
            url: 'https://ec72f6aa76c8.ngrok-free.app/webhook-test/df76ccf6-aa7b-4d15-92ea-68e88b0dc5cc',
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'webhookUrl': webhookUrl,
                    'webhookUrlToken': webhookUrlToken,
                    'delaySendMessagesMilliseconds': delaySendMessagesMilliseconds,
                    'markIncomingMessagesReaded': markIncomingMessagesReaded,
                    'markIncomingMessagesReadedOnReply': markIncomingMessagesReadedOnReply,
                    'outgoingWebhook': outgoingWebhook,
                    'outgoingMessageWebhook': outgoingMessageWebhook,
                    'outgoingAPIMessageWebhook': outgoingAPIMessageWebhook,
                    'stateWebhook': stateWebhook,
                    'incomingWebhook': incomingWebhook,
                    'keepOnlineStatus': keepOnlineStatus,
                    'pollMessageWebhook': pollMessageWebhook,
                    'incomingCallWebhook': incomingCallWebhook,
                    'editedMessageWebhook': editedMessageWebhook,
                    'deletedMessageWebhook': deletedMessageWebhook,
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}