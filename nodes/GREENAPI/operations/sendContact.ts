import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function sendContact(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];
    for (let i = 0; i < items.length; i++) {
		try {
			const chatId = this.getNodeParameter('chatId', i, '') as string;
            const phoneContact = this.getNodeParameter('phoneContact', i, '') as number;
            const firstName = this.getNodeParameter('firstName', i, '') as string;    
            const middleName = this.getNodeParameter('middleName', i, '') as string;
            const lastName = this.getNodeParameter('lastName', i, '') as string;
            const company = this.getNodeParameter('company', i, '') as string;
			const typingTime = this.getNodeParameter('typingTime', i, '') as number;
			const credentials = await this.getCredentials('greenApiAuthApi') as {
				idInstance: string;
				apiTokenKey: string;
			};

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendContact/${credentials.apiTokenKey}`,
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
                    'chatId': chatId,
                    'contact': {
                        'phoneContact': phoneContact,
                        'firstName': firstName,
                        'middleName': middleName,
                        'lastName': lastName,
                        'company': company,
                    },
                    'typingTime': typingTime,
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
