import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';
import { transformParticipants } from '../helpers/transformParticipants';

export async function sendTextStatus(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => ({
			...getParams(this, i, {
				message: {},
				backgroundColor: { default: '' },
				font: { default: '' },
			}),
			participantsRaw: this.getNodeParameter('participants', i, {}) as object,
		}),
		(p) => greenApiRequest(this, 'POST', 'sendTextStatus', {
			message: p.message,
			backgroundColor: p.backgroundColor,
			font: p.font,
			participants: transformParticipants(p.participantsRaw),
		}),
	);
}