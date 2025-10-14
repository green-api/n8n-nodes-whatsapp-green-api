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
            { name: 'getInstances', value: 'getInstances', action: 'getInstances' },
            { name: 'createInstance', value: 'createInstance', action: 'createInstance' },
			{ name: 'deleteInstanceAccount', value: 'deleteInstanceAccount', action: 'deleteInstanceAccount' },
        ],
        default: 'getInstances',
    },
];