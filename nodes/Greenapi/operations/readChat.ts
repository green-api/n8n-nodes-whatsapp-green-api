// readChat.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function readChat(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { chatId: {}, idMessage: { default: '' } }),
		(p) => {
			const body: Record<string, unknown> = { chatId: p.chatId };
			if (p.idMessage) body.idMessage = p.idMessage;
			return greenApiRequest(this, 'POST', 'readChat', body);
		},
	);
}