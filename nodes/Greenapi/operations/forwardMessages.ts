// forwardMessages.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

function extractMessages(raw: any): string[] {
	return Object.values(raw).flatMap((arr) =>
		Array.isArray(arr) ? arr.filter((item) => item?.messageId).map((item) => item.messageId) : [],
	);
}

export async function forwardMessages(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => ({
			...getParams(this, i, { chatId: {}, chatIdFrom: {} }),
			messagesRaw: this.getNodeParameter('messages', i, {}) as object,
		}),
		(p) => greenApiRequest(this, 'POST', 'forwardMessages', {
			chatId: p.chatId,
			chatIdFrom: p.chatIdFrom,
			messages: extractMessages(p.messagesRaw),
		}),
	);
}