import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

export async function sendMessage(this: IExecuteFunctions, items: INodeExecutionData[]) {
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const chatId = this.getNodeParameter('chatId', i, '') as string;
			const message = this.getNodeParameter('message', i, '') as string;
			const quotedMessageId = this.getNodeParameter('quotedMessageId', i, '') as string;
			const typingTime = this.getNodeParameter('typingTime', i, '') as number;
			const credentials = await this.getCredentials('greenApiAuthApi') as {
				idInstance: string;
				apiTokenKey: string;
			};

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenKey}`,
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					chatId,
					message,
					quotedMessageId,
					typingTime,
				},
				json: true,
			});
			returnData.push(response);
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
				continue;
			}

			throw new NodeOperationError(this.getNode(), error as Error, {
				description: error.description,
				itemIndex: i,
			});
		}
	}

	return returnData;
}

