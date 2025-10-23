import { INodeProperties } from 'n8n-workflow';

export const deleteNotificationFields: INodeProperties[] = [
   {
        displayName: 'receiptId',
        name: 'receiptId',
        placeholder: '1',
        type: 'number',
        default: '',
        displayOptions: {
            show: {
                resource: ['receiving',],
                operation:['deleteNotification',],
            },
        },
        required: true,
    },
]