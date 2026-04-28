import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function updateGroupName(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { groupId: {}, groupName: {} }),
		(p) => greenApiRequest(this, 'POST', 'updateGroupName', { groupId: p.groupId, groupName: p.groupName }),
	);
}