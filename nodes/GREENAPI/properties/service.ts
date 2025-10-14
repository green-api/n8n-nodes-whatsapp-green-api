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
            { name: 'checkWhatsapp', value: 'checkWhatsapp', action: 'Check WhatsApp account availability' },
            { name: 'getContacts', value: 'getContacts', action: 'Get contacts' },
            { name: 'getContactInfo', value: 'getContactInfo', action: 'Get contact info' },
            { name: 'getAvatar', value: 'getAvatar', action: 'Get avatar' },
            { name: 'setDisappearingChat', value: 'setDisappearingChat', action: 'Change the settings of disappearing chat messages' },
            { name: 'editMessage', value: 'editMessage', action: 'Edit the text message' },
            { name: 'deleteMessage', value: 'deleteMessage', action: 'Delete a message' },
            { name: 'archiveChat', value: 'archiveChat', action: 'Archive a chat' },
            { name: 'unarchiveChat', value: 'unarchiveChat', action: 'Unarchive a chat' },
            { name: 'readChat', value: 'readChat', action: 'Mark chat as read' },
        ],
        default: 'getContacts',

        
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
                operation:['readChat','getMessage', 'editMessage', 'deleteMessage', 'getAvatar', 'getContactInfo', 'archiveChat', 'unarchiveChat', 'setDisappearingChat',],
            },
        },
        required: true,
    },
    {
        displayName: 'idMessage',
        name: 'idMessage',
        placeholder: '',
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
        placeholder: '',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['service',],
                operation:['GetContactInfo', 'editMessage', 'deleteMessage', 'SetDisappearingChat'],
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
        type: 'options',
        default: '',
		options: [
		{
			name: 'Off (0 seconds)',
			value: 0,
		},
		{
			name: '24 hours',
			value: 86400,
		},
		{
			name: '7 days',
			value: 604800,
		},
		{
			name: '90 days',
			value: 7776000,
		},
	],
        displayOptions: {
            show: {
                resource: ['service',],
                operation:['setDisappearingChat',],
            },
        },
        required: true,
    },
    {
        displayName: 'message',
        name: 'message',
        placeholder: '',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['service',],
                operation:['editMessage',],
            },
        },
        required: true,
    },
];
