import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

function transformChatIds(raw: any) {
    const messages: string[] = [];

    Object.values(raw).forEach((arr) => {
        if (!Array.isArray(arr)) return;

        arr.forEach((item) => {
            if (item && item.messageId) {
                messages.push(item.messageId);
            }
        });
    });

    return messages;
}


export async function forwardMessages(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i, '') as string;
        const chatIdFrom = this.getNodeParameter('chatIdFrom', i, '') as string;
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
        const messagesRaw = this.getNodeParameter('messages', i, {}) as {
            message?: { message: string}[];
        };
        const messages = transformChatIds(messagesRaw);
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/forwardMessages/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'chatId': chatId,
                    'chatIdFrom': chatIdFrom,
                    'messages': messages
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
