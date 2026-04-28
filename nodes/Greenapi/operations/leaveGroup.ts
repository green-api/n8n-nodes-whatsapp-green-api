// leaveGroup.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function leaveGroup(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { groupId: {} }),
		(p) => greenApiRequest(this, 'POST', 'leaveGroup', { groupId: p.groupId }),
	);
}