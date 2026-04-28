import { INodeProperties } from 'n8n-workflow';

export const updateGroupNameFields: INodeProperties[] = [
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
				operation: ['updateGroupName'],
			},
		},
	},
];