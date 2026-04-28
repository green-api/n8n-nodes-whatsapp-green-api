import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';
import { transformParticipants } from '../helpers/transformParticipants';

export async function sendMediaStatus(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => ({
			...getParams(this, i, {
				urlFile: {},
				fileName: {},
				caption: { default: '' },
			}),
			participantsRaw: this.getNodeParameter('participants', i, {}) as object,
		}),
		(p) => greenApiRequest(this, 'POST', 'sendMediaStatus', {
			urlFile: p.urlFile,
			fileName: p.fileName,
			caption: p.caption,
			participants: transformParticipants(p.participantsRaw),
		}),
	);
}