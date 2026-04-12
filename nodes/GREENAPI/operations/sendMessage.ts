// sendMessage.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function sendMessage(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, {
			chatId: {},
			message: {},
			quotedMessageId: { default: '' },
			typingTime: { default: 0 },
		}),
		(p) => greenApiRequest(this, 'POST', 'sendMessage', {
			chatId: p.chatId,
			message: p.message,
			quotedMessageId: p.quotedMessageId,
			typingTime: p.typingTime,
		}),
	);
}