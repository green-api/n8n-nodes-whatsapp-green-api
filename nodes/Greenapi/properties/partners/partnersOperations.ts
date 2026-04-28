import { INodeProperties } from 'n8n-workflow';

export const partnersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['partners'],
			},
		},
		options: [
			{ name: 'Get Instances', value: 'getInstances', action: 'Get instances' },
			{ name: 'Create Instance', value: 'createInstance', action: 'Create instance' },
			{ name: 'Delete Instance Account', value: 'deleteInstanceAccount', action: 'Delete instance account' },
		],
		default: 'getInstances',
	},
];