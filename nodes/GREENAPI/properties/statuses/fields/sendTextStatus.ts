import { INodeProperties } from 'n8n-workflow';

export const sendTextStatusFields: INodeProperties[] = [
    {
        displayName: 'Participants',
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
                displayName: 'Participant',
                name: 'participant',
                values: [
                    {
                        displayName: 'Participant',
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
		displayName: 'Message',
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
		type: 'color',
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
		displayName: 'Font',
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
