import { INodeProperties } from 'n8n-workflow';

export const getChatHistoryFields: INodeProperties[] = [
	{
		displayName: 'chatId',
		name: 'chatId',
		type: 'string',
		default: '',
		placeholder: '79000000000@c.us',
		required: true,
		displayOptions: {
			show: {
				resource: ['journal'],
				operation: ['getChatHistory'],
			},
		},
	},
];