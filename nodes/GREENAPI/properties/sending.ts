import { INodeProperties } from 'n8n-workflow';

export const sendingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sending'],
			},
		},
		options: [
			{ name: 'forwardMessages', value: 'forwardMessages', action: 'Forward messages'},
			{ name: 'sendContact', value: 'sendContact', action: 'Send a contact' },
			{ name: 'sendFileByUrl', value: 'sendFileByUrl', action: 'Send file by url' },
			{ name: 'sendFileByUpload', value: 'sendFileByUpload', action: 'Send file by upload' },
			{ name: 'sendInteractiveButtons', value: 'sendInteractiveButtons', action: 'Send interactive buttons' },
			{ name: 'sendInteractiveButtonsReply', value: 'sendInteractiveButtonsReply', action: 'Send interactive buttons reply' },
			{ name: 'sendLocation', value: 'sendLocation', action: 'Send a location' },
			{ name: 'sendMessage', value: 'sendMessage', action: 'Send message' },
			{ name: 'sendPoll', value: 'sendPoll', action: 'Send poll' },
			{ name: 'uploadFile', value: 'uploadFile', action: 'Upload file' },
		],
		default: 'sendMessage',
	},

	// Здесь идут параметры для sending
	{
		displayName: 'chatId',
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
		displayName: 'quotedMessageId',
		name: 'quotedMessageId',
		type: 'string',
		default: '',


		placeholder: '(optional)',
		displayOptions: {
			show: {
				operation: ['sendMessage', 'sendFileByUrl', 'sendFileByUpload','sendPoll', 'sendInteractiveButtons', 'sendInteractiveButtonsReply', 'sendContact', 'sendLocation'],
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendMessage', 'sendPoll'],
			},
		},
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		default: '',

		displayOptions: {
			show: {
				operation: ['sendFileByUrl', 'sendFileByUpload'],
			},
		},
	},
	{
		displayName: 'fileName',
		name: 'fileName',
		type: 'string',
		default: '',
		placeholder: 'image.jpg',
		required: true,

		displayOptions: {
			show: {
				operation: ['sendFileByUrl'],
			},
		},
	},
	{
		displayName: 'urlFile',
		name: 'urlFile',
		type: 'string',
		default: '',
		placeholder: 'https://my.site.com/my/image.jpg',
		required: true,

		displayOptions: {
			show: {
				operation: ['sendFileByUrl'],
			},
		},
	},
    {
		displayName: 'Phone Number',
		name: 'phoneContact',
		type: 'number',
		default: '',
		placeholder: '79000000000',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
    {
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		default: '',
		placeholder: 'First name',

		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
    {
		displayName: 'Middle Name',
		name: 'middleName',
		type: 'string',
		default: '',
		placeholder: 'Middle name',

		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
    {
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		default: '',
		placeholder: 'Last name',

		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
    {
		displayName: 'Company',
		name: 'company',
		type: 'string',
		default: '',

		placeholder: 'Company name',
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},

    {
		displayName: 'Location Name',
		name: 'nameLocation',
		type: 'string',
		default: '',
		placeholder: 'Office',

		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
    {
		displayName: 'Location Address',
		name: 'address',
		type: 'string',
		default: '',
		placeholder: '123456, Astana',

		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
    {
		displayName: 'Location Latitude',
		name: 'latitude',
		type: 'number',
		default: '',
		placeholder: '12.3456789',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
    {
		displayName: 'Location Longitude',
		name: 'longitude',
		type: 'number',
		default: '',
		placeholder: '10.1112131',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
	{
		displayName: 'chatIdFrom',
		name: 'chatIdFrom',
		type: 'string',
		default: '',
		placeholder: '79000000000@C.US',
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
		placeholder: 'add a message',
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
	{
		displayName: 'Header',
		name: 'header',
		type: 'string',
		default: '',

		placeholder: 'Header',
		description: 'Message title',
		displayOptions: {
			show: {
				operation: ['sendInteractiveButtonsReply', 'sendInteractiveButtons'],
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
				operation: ['sendInteractiveButtonsReply', 'sendInteractiveButtons'],
			},
		},
	},
	{
		displayName: 'Footer',
		name: 'footer',
		type: 'string',
		placeholder: 'Footer',
		default: '',

		description: 'Message footer. Convenient for visually highlighting text that relates to buttons.',
		displayOptions: {
			show: {
				operation: ['sendInteractiveButtonsReply', 'sendInteractiveButtons'],
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
	{
		displayName: 'Options',
		name: 'options',
		type: 'fixedCollection',
		placeholder: 'Add Option',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Option',
				name: 'option',
				values: [
					{
						displayName: 'Option Name',
						name: 'optionName',
						type: 'string',
						default: '',
						placeholder: 'green, red, blue...',
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'multipleAnswers',
		name: 'multipleAnswers',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'fileName',
		name: 'fileName',
		type: 'string',
		placeholder: 'image.jpg',
		default: '',
		displayOptions: {
			show: {
				resource: ['sending'],
				operation: ['sendFileByUpload']
			},
		},
		required: true,
	},
	{
		displayName: 'filePath',
		name: 'filePath',
		type: 'string',
		placeholder: 'C:\\Users\\admin\\Images\\image.jpg',
		default: '',
		displayOptions: {
			show: {
				resource: ['sending'],
				operation: ['uploadFile', 'sendFileByUpload']
			},
		},
		required: true,
	},
];
