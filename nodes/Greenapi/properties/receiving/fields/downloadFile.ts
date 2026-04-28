import { INodeProperties } from 'n8n-workflow';

export const downloadFileFields: INodeProperties[] = [
	{
		displayName: 'Chat ID',
		name: 'chatId',
		placeholder: '79000000000@c.us',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['receiving'],
				operation: ['downloadFile'],
			},
		},
		required: true,
	},
	{
		displayName: 'Message ID',
		name: 'idMessage',
		placeholder: 'BAE01234567890ABC',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['receiving'],
				operation: ['downloadFile'],
			},
		},
		required: true,
	},
];