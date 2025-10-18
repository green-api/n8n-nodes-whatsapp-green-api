import { INodeProperties } from 'n8n-workflow';

export const testOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['testing'],
			},
		},
		options: [
			{ name: 'test', value: 'test', action: 'test'},
		],
		default: 'sendMessage',
	},
	{
		displayName: 'filePath',
		name: 'filePath',
		type: 'string',
		placeholder: 'C:\spike.jpg',
		default: '',
		displayOptions: {
			show: {
				resource: ['testing'],
			},
		},
		required: true,
	},
];
