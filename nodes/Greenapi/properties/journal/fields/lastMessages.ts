import { INodeProperties } from 'n8n-workflow';

export const lastMessagesFields: INodeProperties[] = [
	{
		displayName: 'Minutes',
		name: 'minutes',
		type: 'string',
		default: '',
		placeholder: '1440 minutes by default',
		displayOptions: {
			show: {
				operation: ['lastIncomingMessages', 'lastOutgoingMessages'],
			},
		},
	},
];