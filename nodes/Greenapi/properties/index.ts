import { INodeProperties } from 'n8n-workflow';
import { accountDescription } from './account/accountDescription';
import { sendingDescription } from './sending/sendingDescription';
import { queueDescription } from './queue/queueDescription';
import { journalDescription } from './journal/journalDescription';
import { serviceDescription } from './service/serviceDescription';
import { groupDescription } from './group/groupDescription';
import { statusesDescription } from './statuses/statusesDescription';
import { receivingOperations } from './receiving/receivingOperations';

export const baseProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		options: [
			{ name: 'Account', value: 'account' },
			{ name: 'Group', value: 'group' },
			{ name: 'Journal', value: 'journal' },
			{ name: 'Queue', value: 'queue' },
			{ name: 'Receiving', value: 'receiving' },
			{ name: 'Sending', value: 'sending' },
			{ name: 'Service', value: 'service' },
			{ name: 'Status', value: 'statuses' },
		],
		noDataExpression: true,
		required: true,
		default: 'sending',
	},
];

export const properties: INodeProperties[] = [
	...baseProperties,
	...accountDescription,
	...sendingDescription,
	...queueDescription,
	...journalDescription,
	...serviceDescription,
	...groupDescription,
	...statusesDescription,
	...receivingOperations,
];

export default properties;