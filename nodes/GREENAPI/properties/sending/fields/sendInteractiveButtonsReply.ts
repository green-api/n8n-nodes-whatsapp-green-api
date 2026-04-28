import { INodeProperties } from 'n8n-workflow';

export const sendInteractiveButtonsReplyFields: INodeProperties[] = [
	{
		displayName: 'Header',
		name: 'header',
		type: 'string',
		default: '',
		placeholder: 'Header',
		description: 'Message title',
		displayOptions: {
			show: {
				operation: ['sendInteractiveButtonsReply'],
			},
		},
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		placeholder: 'Body',
		default: '',
		required: true,
		description: 'Message text. Emoji symbols are supported 😃.',
		displayOptions: {
			show: {
				operation: ['sendInteractiveButtonsReply'],
			},
		},
	},
	{
		displayName: 'Footer',
		name: 'footer',
		type: 'string',
		placeholder: 'Footer',
		default: '',
		description: 'Message footer',
		displayOptions: {
			show: {
				operation: ['sendInteractiveButtonsReply'],
			},
		},
	},
	{
		displayName: 'Buttons',
		name: 'buttons',
		type: 'fixedCollection',
		placeholder: 'Add button',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Button',
				name: 'button',
				values: [
					{
						displayName: 'Text on the Button',
						name: 'buttonText',
						type: 'string',
						default: '',
						placeholder: 'Reply text',
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['sendInteractiveButtonsReply'],
			},
		},
	},
];