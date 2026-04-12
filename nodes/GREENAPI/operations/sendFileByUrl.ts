// sendFileByUrl.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function sendFileByUrl(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, {
			chatId: {},
			urlFile: {},
			fileName: {},
			caption: { default: '' },
			quotedMessageId: { default: '' },
			typingTime: { default: 0 },
		}),
		(p) => greenApiRequest(this, 'POST', 'sendFileByUrl', {
			chatId: p.chatId,
			urlFile: p.urlFile,
			fileName: p.fileName,
			caption: p.caption,
			quotedMessageId: p.quotedMessageId,
			typingTime: p.typingTime,
		}),
	);
}