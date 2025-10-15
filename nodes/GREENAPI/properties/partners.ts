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
            { name: 'getInstances', value: 'getInstances', action: 'Get instances' },
            { name: 'createInstance', value: 'createInstance', action: 'Create instance' },
			{ name: 'deleteInstanceAccount', value: 'deleteInstanceAccount', action: 'Delete instance account' },
        ],
        default: 'getInstances',
    },
];