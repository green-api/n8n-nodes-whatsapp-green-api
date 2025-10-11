import { INodeProperties } from 'n8n-workflow';

export const serviceOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['service'],
            },
        },
        options: [
            { name: 'readChat', value: 'readChat', action: 'Show messages queue' },
            { name: 'checkWhatsapp', value: 'checkWhatsapp', action: 'Clear messages queue' },
            { name: 'getAvatar', value: 'getAvatar', action: 'Show messages queue' },
            { name: 'getContacts', value: 'getContacts', action: 'Clear messages queue' },
            { name: 'getContactInfo', value: 'getContactInfo', action: 'Show messages queue' },
            { name: 'deleteMessage', value: 'deleteMessage', action: 'Clear messages queue' },
            { name: 'archiveChat', value: 'archiveChat', action: 'Show messages queue' },
            { name: 'unarchiveChat', value: 'unarchiveChat', action: 'Clear messages queue' },
            { name: 'setDisappearingChat', value: 'setDisappearingChat', action: 'Show messages queue' },
            { name: 'editMessage', value: 'editMessage', action: 'Clear messages queue' },
        ],
        default: 'getWaSettings',

        
    },
    {
        displayName: 'chatId',
        name: 'chatId',
        placeholder: '79000000000@c.us',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['service',],
                operation:['readChat','getMessage', 'deleteMessage'],
            },
        },
        required: true,
    },
    {
        displayName: 'idMessage',
        name: 'idMessage',
        placeholder: '79000000000@c.us',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['service',],
                operation:['readChat',],
            },
        },
        required: false,
    },
    {
        displayName: 'idMessage',
        name: 'idMessage',
        placeholder: '79000000000@c.us',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['service',],
                operation:['getAvatar', 'GetContactInfo', 'editMessage', 'deleteMessage', 'archiveChat', 'unarchiveChat', 'SetDisappearingChat'],
            },
        },
        required: true,
    },
    {
        displayName: 'phoneNumber',
        name: 'phoneNumber',
        placeholder: '79000000000',
        type: 'number',
        default: '',
        displayOptions: {
            show: {
                resource: ['service',],
                operation:['checkWhatsapp',],
            },
        },
        required: true,
    },
    {
        displayName: 'ephemeralExpiration', //тут выбор из 4 вариантов
        name: 'ephemeralExpiration',
        placeholder: '0',
        type: 'number',
        default: '',
        displayOptions: {
            show: {
                resource: ['service',],
                operation:['setDisappearingChat',],
            },
        },
        required: true,
    },
];
