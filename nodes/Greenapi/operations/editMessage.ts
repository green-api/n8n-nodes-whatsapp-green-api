// editMessage.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function editMessage(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { chatId: {}, idMessage: {}, message: {} }),
		(p) => greenApiRequest(this, 'POST', 'editMessage', { chatId: p.chatId, idMessage: p.idMessage, message: p.message }),
	);
}