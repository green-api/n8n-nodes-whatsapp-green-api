import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
declare const console: any;

function transformChatIds(raw: any) {
    const chatIds: string[] = [];

    Object.entries(raw).forEach(([key, arr]) => {
        if (!Array.isArray(arr)) return;

        arr.forEach((item) => {
            if (item && item.chatIdText) {
                chatIds.push(item.chatIdText);
            }
        });
    });

    return chatIds;
}

export async function createGroup(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const groupName = this.getNodeParameter('groupName', i, '') as string; //?
        const credentials = await this.getCredentials('greenApiAuthApi') as {
            idInstance: string;
            apiTokenKey: string;
        };
        
        const chatIdsRaw = this.getNodeParameter('chatIds', i, {}) as {
            chatId?: { chatId: string}[];
        };
        const chatIds = transformChatIds(chatIdsRaw);

        
        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/createGroup/${credentials.apiTokenKey}`,
            //url: 'https://595b3a36826f.ngrok-free.app/webhook-test/df76ccf6-aa7b-4d15-92ea-68e88b0dc5cc',
            headers: { 'Content-Type': 'application/json' },
            body: {
                    'chatIds': chatIds, //?
                    'groupName': groupName //?
                },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
