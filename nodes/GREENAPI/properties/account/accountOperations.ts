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
			{ name: 'Get Settings', value: 'getSettings', action: 'Get settings' },
			{ name: 'Get State Instance', value: 'getStateInstance', action: 'Get state instance' },
			{ name: 'Get WhatsApp Settings', value: 'getWaSettings', action: 'Get information about the account' },
			{ name: 'Logout', value: 'logout', action: 'Logout instance' },
			{ name: 'Reboot', value: 'reboot', action: 'Reboot instance' },
			{ name: 'Set Profile Picture', value: 'setProfilePicture', action: 'Set profile picture'},
			{ name: 'Set Settings', value: 'setSettings', action: 'Set settings' },
		],
		default: 'getWaSettings',
	},
];
