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
            { name: 'Send a text status', value: 'sendTextStatus', action: 'Send a text status' },
            { name: 'Send a voice status', value: 'sendVoiceStatus', action: 'Send a voice status' },
            { name: 'Send a media status', value: 'sendMediaStatus', action: 'Send a media status' },
            { name: 'Delete a status', value: 'deleteStatus', action: 'Delete a status' },
            { name: 'Get incoming statuses', value: 'getIncomingStatuses', action: 'Get incoming statuses' },
            { name: 'Get outgoing statuses', value: 'getOutgoingStatuses', action: 'Get outgoing statuses' },
            { name: 'Get status statistic', value: 'getStatusStatistic', action: 'Get status statistic' },
        ],
        default: 'sendTextStatus',
    },
];
