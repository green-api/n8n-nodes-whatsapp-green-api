// createGroup.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

function extractChatIds(raw: any): string[] {
	return Object.values(raw).flatMap((arr) =>
		Array.isArray(arr) ? arr.filter((item) => item?.chatIdText).map((item) => item.chatIdText) : [],
	);
}

export async function createGroup(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => ({
			...getParams(this, i, { groupName: {} }),
			chatIdsRaw: this.getNodeParameter('chatIds', i, {}) as object,
		}),
		(p) => greenApiRequest(this, 'POST', 'createGroup', {
			groupName: p.groupName,
			chatIds: extractChatIds(p.chatIdsRaw),
		}),
	);
}