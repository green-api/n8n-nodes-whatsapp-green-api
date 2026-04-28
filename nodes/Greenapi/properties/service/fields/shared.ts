import { INodeProperties } from 'n8n-workflow';

export const sharedFields: INodeProperties[] = [
	{
		displayName: 'chatId',
		name: 'chatId',
		type: 'string',
		default: '',
		placeholder: '79000000000@c.us',
		required: true,
		displayOptions: {
			show: {
				resource: ['service'],
				operation: [
					'readChat',
					'editMessage',
					'deleteMessage',
					'getAvatar',
					'getContactInfo',
					'archiveChat',
					'unarchiveChat',
					'setDisappearingChat',
				],
			},
		},
	},
];