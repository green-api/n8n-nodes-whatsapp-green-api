import { INodeProperties } from 'n8n-workflow';

export const forwardMessagesFields: INodeProperties[] = [
	{
		displayName: 'chatIdFrom',
		name: 'chatIdFrom',
		type: 'string',
		default: '',
		placeholder: '79000000000@c.us',
		required: true,
		displayOptions: {
			show: {
				operation: ['forwardMessages'],
			},
		},
	},
	{
		displayName: 'Messages',
		name: 'messages',
		type: 'fixedCollection',
		placeholder: 'Add a message',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Message',
				name: 'message',
				values: [
					{
						displayName: 'messageId',
						name: 'messageId',
						type: 'string',
						default: '',
						placeholder: 'messageId',
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['forwardMessages'],
			},
		},
	},
];