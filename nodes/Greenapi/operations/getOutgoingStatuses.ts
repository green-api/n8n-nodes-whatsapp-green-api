import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function getOutgoingStatuses(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { minutes: { default: '' } }),
		(p) => {
			const endpoint = p.minutes ? `getOutgoingStatuses?minutes=${p.minutes}` : 'getOutgoingStatuses';
			return greenApiRequest(this, 'GET', endpoint, undefined);
		},
	);
}