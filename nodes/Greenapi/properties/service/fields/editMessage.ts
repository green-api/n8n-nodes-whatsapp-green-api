import { INodeProperties } from 'n8n-workflow';

export const editMessageFields: INodeProperties[] = [
	{
		displayName: 'idMessage',
		name: 'idMessage',
		type: 'string',
		default: '',
		placeholder: 'BAE01234567890ABC',
		required: true,
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['editMessage'],
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['editMessage'],
			},
		},
	},
];