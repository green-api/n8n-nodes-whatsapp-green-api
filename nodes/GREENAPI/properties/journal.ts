import { INodeProperties } from 'n8n-workflow';

export const journalOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['journal'],
            },
        },
        options: [
            { name: 'getChatHistory', value: 'getChatHistory', action: 'Get chat history' },
            { name: 'getMessage', value: 'getMessage', action: 'Get a message' },
            { name: 'lastIncomingMessages', value: 'lastIncomingMessages', action: 'Get last incoming messages' },
            { name: 'lastOutgoingMessages', value: 'lastOutgoingMessages', action: 'Get last outgoing messages' },
        ],
        default: 'lastIncomingMessages',
    },
    
    {
        displayName: 'Minutes',
        name: 'minutes',
        type: 'string',
        default: '',
        placeholder: '(1440 minutes by default)',
        displayOptions: {
            show: {
                operation: ['lastIncomingMessages', 'lastOutgoingMessages'],
            },
        },
    },
    {
        displayName: 'chatId',
        name: 'chatId',
        placeholder: '79000000000@c.us',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['journal',],
                operation:['getChatHistory','getMessage',],
            },
        },
        required: true,
    },
    {
        displayName: 'idMessage',
        name: 'idMessage',
        placeholder: 'BAE01234567890ABC',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['journal',],
                operation:['getMessage',],
            },
        },
        required: true,
    },
];
