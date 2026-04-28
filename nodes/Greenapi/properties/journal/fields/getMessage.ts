import { INodeProperties } from 'n8n-workflow';

export const getMessageFields: INodeProperties[] = [
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		default: '',
		placeholder: '79000000000@c.us',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['getMessage'],
			},
		},
	},
	{
		displayName: 'Message ID',
		name: 'idMessage',
		type: 'string',
		default: '',
		placeholder: 'BAE01234567890ABC',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['getMessage'],
			},
		},
	},
];