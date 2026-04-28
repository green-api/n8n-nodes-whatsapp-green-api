// sendInteractiveButtonsReply.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

function transformButtonsSimple(raw: { button?: { buttonText: string }[] }) {
	return (raw.button || []).map((btn, i) => ({ buttonId: String(i + 1), buttonText: btn.buttonText }));
}

export async function sendInteractiveButtonsReply(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => ({
			...getParams(this, i, {
				chatId: {},
				header: { default: '' },
				body: {},
				footer: { default: '' },
				quotedMessageId: { default: '' },
			}),
			buttonsRaw: this.getNodeParameter('buttons', i, { button: [] }) as { button: { buttonText: string }[] },
		}),
		(p) => greenApiRequest(this, 'POST', 'sendInteractiveButtonsReply', {
			chatId: p.chatId,
			...(p.header && { header: p.header }),
			body: p.body,
			...(p.footer && { footer: p.footer }),
			buttons: transformButtonsSimple(p.buttonsRaw),
			quotedMessageId: p.quotedMessageId,
		}),
	);
}