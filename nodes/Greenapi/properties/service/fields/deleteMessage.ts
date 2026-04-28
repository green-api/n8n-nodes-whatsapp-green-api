import { INodeProperties } from 'n8n-workflow';

export const deleteMessageFields: INodeProperties[] = [
	{
		displayName: 'Message ID',
		name: 'idMessage',
		type: 'string',
		default: '',
		placeholder: 'BAE01234567890ABC',
		required: true,
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['deleteMessage'],
			},
		},
	},
];