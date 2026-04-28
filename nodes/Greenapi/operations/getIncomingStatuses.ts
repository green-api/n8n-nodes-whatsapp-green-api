import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function getIncomingStatuses(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { minutes: { default: '' } }),
		(p) => {
			const endpoint = p.minutes ? `getIncomingStatuses?minutes=${p.minutes}` : 'getIncomingStatuses';
			return greenApiRequest(this, 'GET', endpoint, undefined);
		},
	);
}