// checkWhatsapp.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function checkWhatsapp(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { phoneNumber: {} }),
		(p) => greenApiRequest(this, 'POST', 'checkWhatsapp', { phoneNumber: p.phoneNumber }),
	);
}