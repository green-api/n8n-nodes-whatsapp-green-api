// createInstance.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { greenApiPartnerRequest } from '../helpers/partnerRequest';

export async function createInstance(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		() => ({}),
		() => greenApiPartnerRequest(this, 'GET', 'createInstance'),
	);
}