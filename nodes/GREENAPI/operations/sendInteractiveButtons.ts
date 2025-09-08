import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

function transformButtons(raw: any) {
    const buttons: any[] = [];
    let buttonIdCounter = 1;

    Object.entries(raw).forEach(([key, arr]) => {
        if (!Array.isArray(arr)) return;

        arr.forEach((btn: any) => {
            if (key === 'buttonCopy') {
                buttons.push({
                    type: 'copy',
                    buttonId: String(buttonIdCounter++),
                    buttonText: btn.buttonText,
                    copyCode: btn.copyCode
                });
            }
            if (key === 'buttonCall') {
                buttons.push({
                    type: 'call',
                    buttonId: String(buttonIdCounter++),
                    buttonText: btn.buttonText,
                    phoneNumber: btn.phoneNumber
                });
            }
            if (key === 'buttonUrl') {
                buttons.push({
                    type: 'url',
                    buttonId: String(buttonIdCounter++),
                    buttonText: btn.buttonText,
                    url: btn.url
                });
            }
        });
    });

    return buttons;
}

export async function sendInteractiveButtons(this: IExecuteFunctions, items: INodeExecutionData[]) {
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
        const chatId = this.getNodeParameter('chatId', i, '') as string;
        const header = this.getNodeParameter('header', i, '') as string;
        const body = this.getNodeParameter('body', i, '') as string;
        const footer = this.getNodeParameter('footer', i, '') as string;
        const quotedMessageId = this.getNodeParameter('quotedMessageId', i, '') as string;
		//const typingTime = this.getNodeParameter('typingTime', i, '') as number;
        const buttonsRaw = this.getNodeParameter('buttons', i, {}) as {
            button?: { type: string, buttonId: string, buttonText: string, copycode?: string, phoneNumber?: string, url?: string}[];
        };
        const buttons = transformButtons(buttonsRaw);
        const credentials = await this.getCredentials('GreenApiAuth') as {
            idInstance: string;
            apiTokenKey: string;
        };

        const response = await this.helpers.request({
            method: 'POST',
            url: `https://api.green-api.com/waInstance${credentials.idInstance}/sendInteractiveButtons/${credentials.apiTokenKey}`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'chatId': chatId,
                'header': header,
                'body': body,
                'footer': footer,
                'buttons': buttons,
                'quotedMessageId': quotedMessageId,
				//'typingTime': typingTime,
            },
            json: true,
        });

        returnData.push(response);
    }

    return returnData;
}
