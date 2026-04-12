// deleteInstanceAccount.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiPartnerRequest } from '../helpers/partnerRequest';

export async function deleteInstanceAccount(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { idInstance: {} }),
		(p) => greenApiPartnerRequest(this, 'POST', 'deleteInstanceAccount', { idInstance: p.idInstance }),
	);
}