import { INodeProperties } from 'n8n-workflow';

export const setDisappearingChatFields: INodeProperties[] = [
	{
		displayName: 'Ephemeral Expiration',
		name: 'ephemeralExpiration',
		type: 'options',
		default: 0,
		required: true,
		options: [
			{ name: 'Off (0 Seconds)', value: 0 },
			{ name: '24 Hours', value: 86400 },
			{ name: '7 Days', value: 604800 },
			{ name: '90 Days', value: 7776000 },
		],
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['setDisappearingChat'],
			},
		},
	},
];