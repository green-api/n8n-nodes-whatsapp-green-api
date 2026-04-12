// sendInteractiveButtons.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

function transformButtons(raw: any) {
	const buttons: any[] = [];
	let id = 1;
	Object.entries(raw).forEach(([key, arr]) => {
		if (!Array.isArray(arr)) return;
		arr.forEach((btn: any) => {
			if (key === 'buttonCopy') buttons.push({ type: 'copy', buttonId: String(id++), buttonText: btn.buttonText, copyCode: btn.copyCode });
			if (key === 'buttonCall') buttons.push({ type: 'call', buttonId: String(id++), buttonText: btn.buttonText, phoneNumber: btn.phoneNumber });
			if (key === 'buttonUrl')  buttons.push({ type: 'url',  buttonId: String(id++), buttonText: btn.buttonText, url: btn.url });
		});
	});
	return buttons;
}

export async function sendInteractiveButtons(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => ({
			...getParams(this, i, {
				chatId: {},
				header: { default: '' },
				body: {},
				footer: { default: '' },
				quotedMessageId: { default: '' },
			}),
			buttonsRaw: this.getNodeParameter('buttons', i, {}) as object,
		}),
		(p) => greenApiRequest(this, 'POST', 'sendInteractiveButtons', {
			chatId: p.chatId,
			...(p.header && { header: p.header }),
			body: p.body,
			...(p.footer && { footer: p.footer }),
			buttons: transformButtons(p.buttonsRaw),
			...(p.quotedMessageId && { quotedMessageId: p.quotedMessageId }),
		}),
	);
}