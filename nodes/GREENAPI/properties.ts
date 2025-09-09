import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'sending',
						value: 'sending',
					},
					{
						name: 'journal',
						value: 'journal',
					},
                    {
                        name: 'service',
                        value: 'service',
                    },
                    {
                        name: 'group',
                        value: 'group',
                    },
				],
				noDataExpression: true,
				required: true,
				default: 'sending',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'sending',
						],
					},
				},
				options: [
					{
						name: 'sendMessage',
						value: 'sendMessage',
						description: 'sendMessage',
						action: 'sendMessage'
					},
					{
						name: 'sendFileByUrl',
						value: 'sendFileByUrl',
						description: 'sendFileByUrl',
						action: 'sendFileByUrl'
					},
					{
						name: 'sendPoll',
						value: 'sendPoll',
						description: 'sendPoll',
						action: 'sendPoll'
					},
					{
						name: 'sendInteractiveButtonsReply',
						value: 'sendInteractiveButtonsReply',
						description: 'sendInteractiveButtonsReply',
						action: 'sendInteractiveButtonsReply'
					},
					{
						name: 'sendInteractiveButtons',
						value: 'sendInteractiveButtons',
						description: 'sendInteractiveButtons',
						action: 'sendInteractiveButtons'
					}
				],
				default: 'sendMessage',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'journal',
						],
					},
				},
				options: [
					{
						name: 'getChatHistory',
						value: 'getChatHistory',
						description: 'getChatHistory',
						action: 'getChatHistory'
					},
                    {
						name: 'lastIncomingMessages',
						value: 'lastIncomingMessages',
						description: 'lastIncomingMessages',
						action: 'lastIncomingMessages'
					},
                    {
						name: 'lastOutgoingMessages',
						value: 'lastOutgoingMessages',
						description: 'lastOutgoingMessages',
						action: 'lastOutgoingMessages'
					}
				],
				default: 'getChatHistory',
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'service',
						],
					},
				},
				options: [
					{
						name: 'getContacts',
						value: 'getContacts',
						description: 'getContacts',
						action: 'getContacts'
					},
                    {
						name: 'getAvatar',
						value: 'getAvatar',
						description: 'getAvatar',
						action: 'getAvatar'
					},
                    {
						name: 'checkWhatsapp',
						value: 'checkWhatsapp',
						description: 'checkWhatsapp',
						action: 'checkWhatsapp'
					}
				],
				default: 'getContacts',
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'group',
						],
					},
				},
				options: [
					{
						name: 'getGroupData',
						value: 'getGroupData',
						description: 'getGroupData',
						action: 'getGroupData'
					}
				],
				default: 'getGroupData',
			},
            {
				displayName: 'groupId',
				name: 'groupId',
				type: 'string',
				default: '',
				placeholder: '120363043968066561@g.us',
				displayOptions: {
					show: {
						resource: [
							'group',
						],
					},
				},
				required: true,
				description: 'groupId',
			},
			{
				displayName: 'chatId',
				name: 'chatId',
				type: 'string',
				placeholder: '79000000000@c.us',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'sending',
						],
					},
				},
				required: true,
				description: 'chatId',
			},
            {
				displayName: 'chatId',
				name: 'chatId',
				placeholder: '79000000000@c.us',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'journal',
						],
                        operation:[
                            'getChatHistory',
                        ]
					},
				},
				required: true,
				description: 'chatId',
			},
            {
				displayName: 'chatId',
				name: 'chatId',
				type: 'string',
				placeholder: '79000000000@c.us',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'service',
						],
                        operation: [
                            'getAvatar', 
                        ],
					},
				},
				required: true,
				description: 'chatId',
			},
             {
				displayName: 'phoneNumber',
				name: 'phoneNumber',
				placeholder: '79000000000',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'service',
						],
                        operation: [
                            'checkWhatsapp', 
                        ],
					},
				},
				required: true,
				description: 'Recipients phone number in international format: 11 or 12 digits; Example: 79876543210 or 380123456789', //
			},
			{
				displayName: 'message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				description: 'message',
				displayOptions: {
					show: {
						operation: ['sendMessage', 'sendPoll'],
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
				description: 'fileName',
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
				description: 'urlFile',
				displayOptions: {
					show: {
						operation: ['sendFileByUrl'],
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
				description: 'multipleAnswers',
				displayOptions: {
					show: {
						operation: ['sendPoll'],
					},
				},
			},
			{
				displayName: 'quotedMessageId',
				name: 'quotedMessageId',
				type: 'string',
				default: '',
				required: false,
				description: 'quotedMessageId',
				placeholder: '(optional)',
				displayOptions: {
					show: {
						operation: ['sendMessage', 'sendFileByUrl','sendPoll', 'sendInteractiveButtons', 'sendInteractiveButtonsReply'],
					},
				},
			},
			/*{
				displayName: 'typingTime',
				name: 'typingTime',
				type: 'number',
				default: 0,
				required: false,
				description: 'typingTime',
				displayOptions: {
					show: {
						operation: ['sendPoll'],
					},
				},
			},*/
			{
				displayName: 'header',
				name: 'header',
				type: 'string',
				default: '',
				required: false,
				placeholder: 'Header',
				description: 'Message title',
				displayOptions: {
					show: {
						operation: ['sendInteractiveButtonsReply', 'sendInteractiveButtons'],
					},
				},
			},
			{
				displayName: 'body',
				name: 'body',
				type: 'string',
				placeholder: 'Body',
				default: '',
				required: true,
				description: 'Message text. Emoji symbols are supported 😃',
				displayOptions: {
					show: {
						operation: ['sendInteractiveButtonsReply', 'sendInteractiveButtons'],
					},
				},
			},
			{
				displayName: 'footer',
				name: 'footer',
				type: 'string',
				placeholder: 'Footer',
				default: '',
				required: false,
				description: 'Message footer. Convenient for visually highlighting text that relates to buttons',
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
								displayName: 'Text on the button',
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
								displayName: 'Text on the button',
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
								displayName: 'Text on the button',
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
								displayName: 'Text on the button',
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
				displayName: 'minutes',
				name: 'minutes',
				type: 'string',
				default: '',
				required: false,
				description: 'minutes',
				placeholder: '(1440 minutes by default)',
				displayOptions: {
					show: {
						operation: ['lastIncomingMessages', 'lastOutgoingMessages'],
					},
				},
			},
		];

export default properties;