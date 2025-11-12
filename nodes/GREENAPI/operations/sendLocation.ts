import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function sendLocation(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
		try {
			const chatId = this.getNodeParameter('chatId', i, '') as string;
            const nameLocation = this.getNodeParameter('nameLocation', i, '') as string;
            const address = this.getNodeParameter('address', i, '') as string;    
            const latitude = this.getNodeParameter('latitude', i, '') as number;
            const longitude = this.getNodeParameter('longitude', i, '') as number;
            const typingTime = this.getNodeParameter('typingTime', i, '') as number;
            const credentials = await this.getCredentials('greenApiAuthApi') as {
                idInstance: string;
                apiTokenKey: string;
            };

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendLocation/${credentials.apiTokenKey}`,
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					chatId,
                    nameLocation,
                    address,
                    latitude,
                    longitude,
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
