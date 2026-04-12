import { INodeProperties } from 'n8n-workflow';

export const readChatFields: INodeProperties[] = [
	{
		displayName: 'idMessage',
		name: 'idMessage',
		type: 'string',
		default: '',
		placeholder: 'BAE01234567890ABC',
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['readChat'],
			},
		},
	},
];