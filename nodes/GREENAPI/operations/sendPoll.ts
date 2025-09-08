import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function sendPoll(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i, '') as string;
        const message = this.getNodeParameter('message', i, '') as string;
        const optsRaw = this.getNodeParameter('options', i, {}) as {
            option?: { optionName: string }[];
        };
        const options = optsRaw.option || [];
        const multipleAnswers = this.getNodeParameter('multipleAnswers', i, '') as boolean;
        const quotedMessageId = this.getNodeParameter('quotedMessageId', i, '') as string;
        //const typingTime = this.getNodeParameter('typingTime', i, '') as number;
        const credentials = await this.getCredentials('GreenApiAuth') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendPoll/${credentials.apiTokenKey}`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                'chatId': chatId,
                'message': message,
                'options': options,
                'multipleAnswers': multipleAnswers,
                'quotedMessageId': quotedMessageId,
                //'typingTime': typingTime,
            },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
