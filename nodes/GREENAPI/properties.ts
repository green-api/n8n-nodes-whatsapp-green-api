import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Sending',
						value: 'sending',
					},
					{
						name: 'Journal',
						value: 'journal',
					},
                    {
                        name: 'Service',
                        value: 'service',
                    },
                    {
                        name: 'Group',
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
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'sending',
						],
					},
				},
				options: [
					{
						name: 'sendFileByUrl',
						value: 'sendFileByUrl',
						action: 'Send file by url'
					},
					{
						name: 'sendInteractiveButtons',
						value: 'sendInteractiveButtons',
						action: 'Send interactive buttons'
					},
					{
						name: 'sendInteractiveButtonsReply',
						value: 'sendInteractiveButtonsReply',
						action: 'Send interactive buttons reply'
					},
					{
						name: 'sendMessage',
						value: 'sendMessage',
						action: 'Send message'
					},
					{
						name: 'sendPoll',
						value: 'sendPoll',
						action: 'Send poll'
					}
				],
				default: 'sendMessage',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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

						action: 'Get chat history'
					},
                    {
						name: 'lastIncomingMessages',
						value: 'lastIncomingMessages',

						action: 'Last incoming messages'
					},
                    {
						name: 'lastOutgoingMessages',
						value: 'lastOutgoingMessages',

						action: 'Last outgoing messages'
					}
				],
				default: 'getChatHistory',
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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

						action: 'Get contacts'
					},
                    {
						name: 'getAvatar',
						value: 'getAvatar',

						action: 'Get avatar'
					},
                    {
						name: 'checkWhatsapp',
						value: 'checkWhatsapp',

						action: 'Check whatsapp'
					}
				],
				default: 'getContacts',
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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

						action: 'Get group data'
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
				displayName: 'quotedMessageId',
				name: 'quotedMessageId',
				type: 'string',
				default: '',


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
				displayName: 'Minutes',
				name: 'minutes',
				type: 'string',
				default: '',


				placeholder: '(1440 minutes by default)',
				displayOptions: {
					show: {
						operation: ['lastIncomingMessages', 'lastOutgoingMessages'],
					},
				},
			},
		];

export default properties;