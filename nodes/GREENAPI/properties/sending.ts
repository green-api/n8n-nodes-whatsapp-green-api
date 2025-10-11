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
			{ name: 'sendFileByUrl', value: 'sendFileByUrl', action: 'Send file by url' },
			{ name: 'sendInteractiveButtons', value: 'sendInteractiveButtons', action: 'Send interactive buttons' },
			{ name: 'sendInteractiveButtonsReply', value: 'sendInteractiveButtonsReply', action: 'Send interactive buttons reply' },
			{ name: 'sendMessage', value: 'sendMessage', action: 'Send message' },
			{ name: 'sendPoll', value: 'sendPoll', action: 'Send poll' },

            { name: 'sendContact', value: 'sendContact', action: 'Send a contact' },
            { name: 'sendLocation', value: 'sendLocation', action: 'Send a location' },
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
		},
		required: true,
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
		displayName: 'Phone number',
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
		displayName: 'First name',
		name: 'firstName',
		type: 'string',
		default: '',
		placeholder: 'First name',
		required: false,
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
    {
		displayName: 'Middle name',
		name: 'middleName',
		type: 'string',
		default: '',
		placeholder: 'Middle name',
		required: false,
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
    {
		displayName: 'Last name',
		name: 'lastName',
		type: 'string',
		default: '',
		placeholder: 'Last name',
		required: false,
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
		required: false,
		placeholder: 'Company name',
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},

    {
		displayName: 'Location name',
		name: 'nameLocation',
		type: 'string',
		default: '',
		placeholder: 'Office',
		required: false,
		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
    {
		displayName: 'Location address',
		name: 'address',
		type: 'string',
		default: '',
		placeholder: '123456, Astana',
		required: false,
		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
    {
		displayName: 'Location latitude',
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
		displayName: 'Location longitude',
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
	// … и остальные параметры
];
