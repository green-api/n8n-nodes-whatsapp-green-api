import { INodeProperties } from 'n8n-workflow';
import { accountDescription } from './account/account.description';
import { sendingOperations } from './sending';
import { queueOperations } from './queue';
import { journalOperations } from './journal';
import { serviceOperations } from './service';
import { groupOperations } from './group';
import { statusesDescription } from './statuses/statuses.description';
import { testOperations } from './test';

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
			{ name: 'Sending', value: 'sending' },
			{ name: 'Service', value: 'service' },
			{ name: 'Statuses', value: 'statuses' },
			{ name: 'test', value: 'testing' },
		],
		noDataExpression: true,
		required: true,
		default: 'sending',
	},
];

export const properties: INodeProperties[] = [
	...baseProperties,
	...accountDescription,
	...sendingOperations,
	...queueOperations,
	...journalOperations,
	...serviceOperations,
	...groupOperations,
	...statusesDescription,
	...testOperations,
];

export default properties;
