import { INodeProperties } from 'n8n-workflow';

export const journalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['journal'],
			},
		},
		options: [
			{ name: 'Get Chat History', value: 'getChatHistory', action: 'Get chat history' },
			{ name: 'Get Message', value: 'getMessage', action: 'Get a message' },
			{ name: 'Last Incoming Calls', value: 'lastIncomingCalls', action: 'Get last incoming calls' },
			{ name: 'Last Incoming Messages', value: 'lastIncomingMessages', action: 'Get last incoming messages' },
			{ name: 'Last Outgoing Calls', value: 'lastOutgoingCalls', action: 'Get last outgoing calls' },
			{ name: 'Last Outgoing Messages', value: 'lastOutgoingMessages', action: 'Get last outgoing messages' },
		],
		default: 'lastIncomingMessages',
	},
];