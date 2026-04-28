import { INodeProperties } from 'n8n-workflow';

export const getOutgoingStatusesFields: INodeProperties[] = [
    {
        displayName: 'Minutes',
        name: 'minutes',
        type: 'string',
        default: '',
        placeholder: '(1440 minutes by default)',
        displayOptions: {
            show: {
                operation: ['getOutgoingStatuses'],
            },
        },
    },
]