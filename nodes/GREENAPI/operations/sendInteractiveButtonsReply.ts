import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

function transformButtonsSimple(raw: { button: { buttonText: string }[] }) {
    return raw.button.map((btn, index) => ({
        buttonId: String(index + 1),
        buttonText: btn.buttonText
    }));
}

export async function sendInteractiveButtonsReply(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];
    for (let i = 0; i < items.length; i++) {
        try{
            const chatId = this.getNodeParameter('chatId', i, '') as string;
            const header = this.getNodeParameter('header', i, '') as string;
            const body = this.getNodeParameter('body', i, '') as string;
            const footer = this.getNodeParameter('footer', i, '') as string;
            const buttonsRaw = this.getNodeParameter('buttons', i, { button: [] }) as { button: { buttonText: string }[] };
            const buttons = transformButtonsSimple(buttonsRaw);
            const quotedMessageId = this.getNodeParameter('quotedMessageId', i, '') as string;
            const credentials = await this.getCredentials('greenApiAuthApi') as {
                idInstance: string;
                apiTokenKey: string;
            };
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendInteractiveButtonsReply/${credentials.apiTokenKey}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    chatId,
                    header,
                    body,
                    footer,
                    buttons,
                    quotedMessageId,
                },
                json: true,
            });
            returnData.push(response);
        } catch (error) {
			this.logger.error('GREEN-API request failed ', { error: error.message },);
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