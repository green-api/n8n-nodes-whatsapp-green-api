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
            { name: 'Download a File', value: 'downloadFile', action: 'Download a File' },
            { name: 'Receive a notification', value: 'receiveNotification', action: 'Receive a notification' },
            { name: 'Delete a notification', value: 'deleteNotification', action: 'Delete a notification' },
        ],
        default: 'downloadFile',
    },
];
