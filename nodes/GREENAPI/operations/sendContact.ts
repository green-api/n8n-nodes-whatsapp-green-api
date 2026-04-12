// sendContact.ts
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';

export async function sendContact(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => getParams(this, i, {
			chatId: {},
			phoneContact: {},
			firstName: { default: '' },
			middleName: { default: '' },
			lastName: { default: '' },
			company: { default: '' },
			typingTime: { default: 0 },
		}),
		(p) => greenApiRequest(this, 'POST', 'sendContact', {
			chatId: p.chatId,
			contact: {
				phoneContact: p.phoneContact,
				firstName: p.firstName,
				middleName: p.middleName,
				lastName: p.lastName,
				company: p.company,
			},
			typingTime: p.typingTime,
		}),
	);
}