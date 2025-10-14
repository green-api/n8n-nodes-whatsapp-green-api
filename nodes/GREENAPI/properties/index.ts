import { INodeProperties } from 'n8n-workflow';
import { accountOperations } from './account';
import { sendingOperations } from './sending';
import { queueOperations } from './queue';
import { journalOperations } from './journal';
import { serviceOperations } from './service';
import { groupOperations } from './group';
//import { partnersOperations } from './partners';

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
			//{ name: 'Partners', value: 'partners' },
		],
		noDataExpression: true,
		required: true,
		default: 'sending',
	},
];

export const properties: INodeProperties[] = [
	...baseProperties,
	...accountOperations,
	...sendingOperations,
	...queueOperations,
	...journalOperations,
	...serviceOperations,
	...groupOperations,
	//...partnersOperations,
];

export default properties;
