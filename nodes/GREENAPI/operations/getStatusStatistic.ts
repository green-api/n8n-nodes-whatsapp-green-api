import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function getStatusStatistic(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { idMessage: {} }),
		(p) => greenApiRequest(this, 'GET', 'getStatusStatistic', { idMessage: p.idMessage }),
	);
}