import { INodeProperties } from 'n8n-workflow';

export const sendTextStatusFields: INodeProperties[] = [
    {
        displayName: 'participants',
        name: 'participants',
        type: 'fixedCollection',
        placeholder: 'Add participant',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        required: true,
        options: [
            {
                displayName: 'participant',
                name: 'participant',
                values: [
                    {
                        displayName: 'participant',
                        name: 'participantText',
                        type: 'string',
                        default: '',
                        placeholder: '79000000000@c.us',
                    },
                ],
            },
        ],        
        displayOptions: {
            show: {
                resource: ['statuses',],
                operation: ['sendTextStatus'],
            },
        },
    },
    {
		displayName: 'message',
		name: 'message',
		type: 'string',
		placeholder: 'Your message',
		default: '',
		displayOptions: {
            show: {
                resource: ['statuses',],
                operation: ['sendTextStatus'],
            },
        },
		required: true,
	},
    {
		displayName: 'backgroundColor',
		name: 'backgroundColor',
		type: 'string',
		placeholder: '#228B22',
		default: '',
		displayOptions: {
            show: {
                resource: ['statuses',],
                operation: ['sendTextStatus'],
            },
        },
		required: true,
	},
    {
		displayName: 'font',
		name: 'font',
		type: 'string',
		placeholder: 'SERIF',
		default: '',
		displayOptions: {
            show: {
                resource: ['statuses',],
                operation: ['sendTextStatus'],
            },
        },
		required: true,
	},
];
