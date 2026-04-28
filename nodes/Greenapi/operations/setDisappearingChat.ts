// setDisappearingChat.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function setDisappearingChat(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { chatId: {}, ephemeralExpiration: { default: 0 } }),
		(p) => greenApiRequest(this, 'POST', 'setDisappearingChat', { chatId: p.chatId, ephemeralExpiration: p.ephemeralExpiration }),
	);
}