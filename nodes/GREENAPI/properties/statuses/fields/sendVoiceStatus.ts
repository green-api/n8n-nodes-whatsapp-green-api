import { INodeProperties } from 'n8n-workflow';

export const sendVoiceStatusFields: INodeProperties[] = [
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
                operation: ['sendVoiceStatus'],
            },
        },
    },
    {
        displayName: 'urlFile',
        name: 'urlFile',
        type: 'string',
        placeholder: 'urlFile: https://sw-media.storage.greenapi.net/1101000000/537157f6-4e24-4c4e-b5c6-9406c702f196.png',
        default: '',
        displayOptions: {
            show: {
                resource: ['statuses',],
                operation: ['sendVoiceStatus'],
            },
        },
        required: true,
    },
    {
        displayName: 'fileName',
        name: 'fileName',
        type: 'string',
        placeholder: 'Filename with extension. image.jpg',
        default: '',
        displayOptions: {
            show: {
                resource: ['statuses',],
                operation: ['sendVoiceStatus'],
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
                operation: ['sendVoiceStatus'],
            },
        },
		required: true,
	},
];
