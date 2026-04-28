import { INodeProperties } from 'n8n-workflow';

export const sendInteractiveButtonsFields: INodeProperties[] = [
	{
		displayName: 'Header',
		name: 'header',
		type: 'string',
		default: '',
		placeholder: 'Header',
		description: 'Message title',
		displayOptions: {
			show: {
				operation: ['sendInteractiveButtons'],
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
				operation: ['sendInteractiveButtons'],
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
				operation: ['sendInteractiveButtons'],
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
			minAllowedFields: 1,
			maxAllowedFields: 3,
		},
		options: [
			{
				displayName: 'Url',
				name: 'buttonUrl',
				values: [
					{
						displayName: 'Text on the Button',
						name: 'buttonText',
						type: 'string',
						default: '',
						placeholder: 'TEXT',
					},
					{
						displayName: 'Url',
						name: 'url',
						type: 'string',
						default: '',
						placeholder: 'https://www.green-api.com',
					},
				],
			},
			{
				displayName: 'Call',
				name: 'buttonCall',
				values: [
					{
						displayName: 'Text on the Button',
						name: 'buttonText',
						type: 'string',
						default: '',
						placeholder: 'TEXT',
					},
					{
						displayName: 'phoneNumber',
						name: 'phoneNumber',
						type: 'string',
						default: '',
						placeholder: '79000000000',
					},
				],
			},
			{
				displayName: 'Copy',
				name: 'buttonCopy',
				values: [
					{
						displayName: 'Text on the Button',
						name: 'buttonText',
						type: 'string',
						default: '',
						placeholder: 'TEXT',
					},
					{
						displayName: 'copyCode',
						name: 'copyCode',
						type: 'string',
						default: '',
						placeholder: '1337',
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['sendInteractiveButtons'],
			},
		},
	},
];