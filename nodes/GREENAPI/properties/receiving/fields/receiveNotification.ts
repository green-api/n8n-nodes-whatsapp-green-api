import { INodeProperties } from 'n8n-workflow';

export const receiveNotificationFields: INodeProperties[] = [
   {
        displayName: 'receiveTimeout',
        name: 'receiveTimeout',
        placeholder: '5',
        type: 'number',
        default: '',
        displayOptions: {
            show: {
                resource: ['receiving',],
                operation:['receiveNotification',],
            },
        },
        required: false,
    },
]