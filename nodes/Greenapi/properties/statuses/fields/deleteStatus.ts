import { INodeProperties } from 'n8n-workflow';

export const deleteStatusFields: INodeProperties[] = [
	{
		displayName: 'Message ID',
		name: 'idMessage',
		placeholder: 'BAE01234567890ABC',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['statuses'],
				operation: ['deleteStatus'],
			},
		},
		required: true,
	},
];