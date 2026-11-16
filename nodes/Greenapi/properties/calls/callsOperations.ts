import { INodeProperties } from 'n8n-workflow';

export const callsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['calls'],
			},
		},
		options: [
			{ name: 'Accept Call', value: 'callsAccept', action: 'Accept the incoming call' },
			{ name: 'Get Call Recording', value: 'getCallRecording', action: 'Get a call recording' },
			{ name: 'Get Call State', value: 'callsState', action: 'Get the call state' },
			{ name: 'Hang Up', value: 'callsHangUp', action: 'Hang up the call' },
			{ name: 'Make Call', value: 'callsDial', action: 'Make a call' },
			{ name: 'Reject Call', value: 'callsReject', action: 'Reject the incoming call' },
		],
		default: 'callsDial',
	},
];
