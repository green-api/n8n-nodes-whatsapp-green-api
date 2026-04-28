// getContacts.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { greenApiRequest } from '../helpers/request';

export async function getContacts(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		() => ({}),
		() => greenApiRequest(this, 'GET', 'getContacts', undefined),
	);
}