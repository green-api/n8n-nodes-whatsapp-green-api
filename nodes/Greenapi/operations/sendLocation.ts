// sendLocation.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function sendLocation(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, {
			chatId: {},
			nameLocation: { default: '' },
			address: { default: '' },
			latitude: {},
			longitude: {},
			typingTime: { default: 0 },
		}),
		(p) => greenApiRequest(this, 'POST', 'sendLocation', {
			chatId: p.chatId,
			nameLocation: p.nameLocation,
			address: p.address,
			latitude: p.latitude,
			longitude: p.longitude,
			typingTime: p.typingTime,
		}),
	);
}