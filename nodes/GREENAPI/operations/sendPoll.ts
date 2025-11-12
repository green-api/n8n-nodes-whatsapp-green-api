import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function sendPoll(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
		try {
			const chatId = this.getNodeParameter('chatId', i, '') as string;
            const message = this.getNodeParameter('message', i, '') as string;
            const optsRaw = this.getNodeParameter('options', i, {}) as {
                option?: { optionName: string }[];
            };
            const options = optsRaw.option || [];
            const multipleAnswers = this.getNodeParameter('multipleAnswers', i, '') as boolean;
            const quotedMessageId = this.getNodeParameter('quotedMessageId', i, '') as string;
            const credentials = await this.getCredentials('greenApiAuthApi') as {
                idInstance: string;
                apiTokenKey: string;
            };
			const typingTime = this.getNodeParameter('typingTime', i, '') as number;
			

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendPoll/${credentials.apiTokenKey}`,
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					chatId,
					message,
                    options,
                    multipleAnswers,
					quotedMessageId,
					typingTime,
				},
                json: true,
			});
			returnData.push(response);
		} catch (error) {
			this.logger.error('GREEN-API request failed', { error: error.message });
			returnData.push({
				json: {
					error: 'Failed to send message',
					details: error.message,
				},
				pairedItem: { item: i },
			});
		}
	}

    return returnData;
}
