import { INodeProperties } from 'n8n-workflow';

export const sendMessageFields: INodeProperties[] = [
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendMessage'],
			},
		},
	},
];