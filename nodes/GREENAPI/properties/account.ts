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
			{ name: 'setSettings', value: 'setSettings', action: 'Set settings' },
			{ name: 'getStateInstance', value: 'getStateInstance', action: 'Get state instance' },
			{ name: 'reboot', value: 'reboot', action: 'Reboot instance' },
			{ name: 'logout', value: 'logout', action: 'Logout instance' },
			{ name: 'setProfilePicture', value: 'setProfilePicture', action: 'Set profile picture' },
			{ name: 'getWaSettings', value: 'getWaSettings', action: 'Get information about the account' },
		],
		default: 'getWaSettings',
	},
/*
    {
		displayName: 'chatId',
		name: 'chatId',
		type: 'string',
		placeholder: '79000000000@c.us',
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		required: true,
	},
*/
];
