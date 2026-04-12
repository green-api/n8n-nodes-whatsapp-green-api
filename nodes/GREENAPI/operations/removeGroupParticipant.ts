// removeGroupParticipant.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function removeGroupParticipant(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, { groupId: {}, participantChatId: {} }),
		(p) => greenApiRequest(this, 'POST', 'removeGroupParticipant', { groupId: p.groupId, participantChatId: p.participantChatId }),
	);
}