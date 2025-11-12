import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function sendFileByUrl(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        try{
            const chatId = this.getNodeParameter('chatId', i, '') as string;
            const fileName = this.getNodeParameter('fileName', i, '') as string;
            const urlFile = this.getNodeParameter('urlFile', i, '') as string;
            const quotedMessageId = this.getNodeParameter('quotedMessageId', i, '') as string;
            const typingTime = this.getNodeParameter('typingTime', i, '') as number;
            const credentials = await this.getCredentials('greenApiAuthApi') as {
                idInstance: string;
                apiTokenKey: string;
            };

            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendFileByUrl/${credentials.apiTokenKey}`,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    chatId,
                    fileName,
                    urlFile,
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
