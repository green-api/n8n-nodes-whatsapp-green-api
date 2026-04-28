import { INodeProperties } from 'n8n-workflow';

export const sharedFields: INodeProperties[] = [
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		placeholder: '79000000000@c.us',
		default: '',
		displayOptions: {
			show: {
				resource: ['sending'],
			},
			hide: {
				operation: ['uploadFile'],
			},
		},
		required: true,
	},
	{
		displayName: 'Quoted Message ID',
		name: 'quotedMessageId',
		type: 'string',
		default: '',
		placeholder: '(optional)',
		displayOptions: {
			show: {
				operation: [
					'sendMessage',
					'sendFileByUrl',
					'sendFileByUpload',
					'sendPoll',
					'sendInteractiveButtons',
					'sendInteractiveButtonsReply',
					'sendContact',
					'sendLocation',
				],
			},
		},
	},
];