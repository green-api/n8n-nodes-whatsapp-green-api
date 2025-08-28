import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
declare const console: any;

function transformButtonsSimple(raw: { button: { buttonText: string }[] }) {
    return raw.button.map((btn, index) => ({
        buttonId: String(index + 1),
        buttonText: btn.buttonText
    }));
}

export async function sendInteractiveButtonsReply(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i, '') as string;
        const header = this.getNodeParameter('header', i, '') as string;
        const body = this.getNodeParameter('body', i, '') as string;
        const footer = this.getNodeParameter('footer', i, '') as string;
        const buttonsRaw = this.getNodeParameter('buttons', i, { button: [] }) as { button: { buttonText: string }[] };
        const buttons = transformButtonsSimple(buttonsRaw);
        const credentials = await this.getCredentials('GreenApiAuth') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendInteractiveButtonsReply/${credentials.apiTokenKey}`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'chatId': chatId,
                'header': header,
                'body': body,
                'footer': footer,
                'buttons': buttons
            },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
