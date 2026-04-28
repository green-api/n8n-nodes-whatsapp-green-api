import { INodeProperties } from 'n8n-workflow';

export const receivingOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['receiving'],
            },
        },
        options: [
            { name: 'Download a File', value: 'downloadFile', action: 'Download a file' },
        ],
        default: 'downloadFile',
    },
];
