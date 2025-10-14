import { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{ name: 'getSettings', value: 'getSettings', action: 'Get settings' },
			//{ name: 'setSettings', value: 'setSettings', action: 'Set settings' },
			{ name: 'getStateInstance', value: 'getStateInstance', action: 'Get state instance' },
			{ name: 'getWaSettings', value: 'getWaSettings', action: 'Get information about the account' },
			{ name: 'Logout', value: 'logout', action: 'Logout instance' },
			{ name: 'Reboot', value: 'reboot', action: 'Reboot instance' },
			//{ name: 'setProfilePicture', value: 'setProfilePicture', action: 'Set profile picture' },
		],
		default: 'getWaSettings',
	},
	{
		displayName: 'webhookUrl',
		name: 'webhookUrl',
		type: 'string',
		default: '',

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'webhookUrlToken',
		name: 'webhookUrlToken',
		type: 'string',
		typeOptions: { password: true },
		default: '',

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'delaySendMessagesMilliseconds',
		name: 'delaySendMessagesMilliseconds',
		type: 'number',
		default: '',

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'markIncomingMessagesReaded',
		name: 'markIncomingMessagesReaded',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'outgoingWebhook',
		name: 'outgoingWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'outgoingMessageWebhook',
		name: 'outgoingMessageWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'outgoingAPIMessageWebhook',
		name: 'outgoingAPIMessageWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'stateWebhook',
		name: 'stateWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'incomingWebhook',
		name: 'incomingWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'keepOnlineStatus',
		name: 'keepOnlineStatus',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'pollMessageWebhook',
		name: 'pollMessageWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'incomingCallWebhook',
		name: 'incomingCallWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'editedMessageWebhook',
		name: 'editedMessageWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
	{
		displayName: 'deletedMessageWebhook',
		name: 'deletedMessageWebhook',
		type: 'boolean',
		default: false,

		displayOptions: {
			show: {
				operation: ['setSettings'],
			},
		},
	},
];
