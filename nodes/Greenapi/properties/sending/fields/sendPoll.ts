import { INodeProperties } from 'n8n-workflow';

export const sendPollFields: INodeProperties[] = [
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'fixedCollection',
		placeholder: 'Add Option',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Option',
				name: 'option',
				values: [
					{
						displayName: 'Option Name',
						name: 'optionName',
						type: 'string',
						default: '',
						placeholder: 'green, red, blue...',
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['sendPoll'],
			},
		},
	},
	{
		displayName: 'multipleAnswers',
		name: 'multipleAnswers',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				operation: ['sendPoll'],
			},
		},
	},
];