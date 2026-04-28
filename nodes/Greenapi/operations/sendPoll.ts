// sendPoll.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function sendPoll(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => ({
			...getParams(this, i, {
				chatId: {},
				message: {},
				multipleAnswers: { default: false },
				quotedMessageId: { default: '' },
				typingTime: { default: 0 },
			}),
			optsRaw: this.getNodeParameter('options', i, {}) as { option?: { optionName: string }[] },
		}),
		(p) => greenApiRequest(this, 'POST', 'sendPoll', {
			chatId: p.chatId,
			message: p.message,
			options: p.optsRaw.option || [],
			multipleAnswers: p.multipleAnswers,
			quotedMessageId: p.quotedMessageId,
			typingTime: p.typingTime,
		}),
	);
}