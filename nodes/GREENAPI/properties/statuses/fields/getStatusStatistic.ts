import { INodeProperties } from 'n8n-workflow';

export const getStatusStatisticFields: INodeProperties[] = [
    {
        displayName: 'idMessage',
        name: 'idMessage',
        placeholder: 'BAE01234567890ABC',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation:['getStatusStatistic',],
            },
        },
        required: true,
    },
]