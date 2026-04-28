import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function lastIncomingMessages(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { minutes: { default: '' } }),
		(p) => greenApiRequest(this, 'GET', 'lastIncomingMessages', undefined, p.minutes ? { minutes: p.minutes } : undefined),
	);
}