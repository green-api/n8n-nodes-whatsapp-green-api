import { INodeProperties } from 'n8n-workflow';

export const createGroupFields: INodeProperties[] = [
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		default: '',
		placeholder: 'Group name',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
	},
	{
		displayName: 'Chat IDs',
		name: 'chatIds',
		type: 'fixedCollection',
		placeholder: 'Add chatId',
		default: {},
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Chat ID',
				name: 'chatId',
				values: [
					{
						displayName: 'Chat ID',
						name: 'chatIdText',
						type: 'string',
						default: '',
						placeholder: '79000000000@c.us',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
	},
];