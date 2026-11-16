import { INodeProperties } from 'n8n-workflow';

export const callsDialFields: INodeProperties[] = [
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		default: '',
		placeholder: '79000000000@c.us',
		required: true,
		displayOptions: {
			show: {
				resource: ['calls'],
				operation: ['callsDial'],
			},
		},
	},
];
