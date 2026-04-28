import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';
import { transformParticipants } from '../helpers/transformParticipants';

export async function sendVoiceStatus(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => ({
			...getParams(this, i, {
				urlFile: {},
				fileName: {},
				backgroundColor: { default: '' },
			}),
			participantsRaw: this.getNodeParameter('participants', i, {}) as object,
		}),
		(p) => greenApiRequest(this, 'POST', 'sendVoiceStatus', {
			urlFile: p.urlFile,
			fileName: p.fileName,
			backgroundColor: p.backgroundColor,
			participants: transformParticipants(p.participantsRaw),
		}),
	);
}