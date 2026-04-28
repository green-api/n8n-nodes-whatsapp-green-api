// deleteMessage.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function deleteMessage(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { chatId: {}, idMessage: {} }),
		(p) => greenApiRequest(this, 'POST', 'deleteMessage', { chatId: p.chatId, idMessage: p.idMessage }),
	);
}