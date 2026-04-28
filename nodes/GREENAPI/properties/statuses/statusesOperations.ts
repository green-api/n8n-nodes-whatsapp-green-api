import { INodeProperties } from 'n8n-workflow';

export const statusesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['statuses'],
			},
		},
		options: [
			{ name: 'Delete a Status', value: 'deleteStatus', action: 'Delete a status' },
			{ name: 'Get Incoming Statuses', value: 'getIncomingStatuses', action: 'Get incoming statuses' },
			{ name: 'Get Outgoing Statuses', value: 'getOutgoingStatuses', action: 'Get outgoing statuses' },
			{ name: 'Get Status Statistic', value: 'getStatusStatistic', action: 'Get status statistic' },
			{ name: 'Send a Media Status', value: 'sendMediaStatus', action: 'Send a media status' },
			{ name: 'Send a Text Status', value: 'sendTextStatus', action: 'Send a text status' },
			{ name: 'Send a Voice Status', value: 'sendVoiceStatus', action: 'Send a voice status' },
		],
		default: 'sendTextStatus',
	},
];