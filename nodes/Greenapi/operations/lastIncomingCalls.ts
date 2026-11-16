import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function lastIncomingCalls(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { minutes: { default: '' } }),
		(p) => greenApiRequest(this, 'GET', 'lastIncomingCalls', undefined, p.minutes ? { minutes: p.minutes } : undefined),
	);
}
