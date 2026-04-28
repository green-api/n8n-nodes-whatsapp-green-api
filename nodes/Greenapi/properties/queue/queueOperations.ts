import { INodeProperties } from 'n8n-workflow';

export const queueOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['queue'],
			},
		},
		options: [
			{ name: 'Show Messages Queue', value: 'showMessagesQueue', action: 'Show messages queue' },
			{ name: 'Clear Messages Queue', value: 'clearMessagesQueue', action: 'Clear messages queue' },
		],
		default: 'showMessagesQueue',
	},
];