import { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{ name: 'Add Group Participant', value: 'addGroupParticipant', action: 'Add group participant' },
			{ name: 'Create Group', value: 'createGroup', action: 'Create a group' },
			{ name: 'Get Group Data', value: 'getGroupData', action: 'Get group data' },
			{ name: 'Leave Group', value: 'leaveGroup', action: 'Leave group' },
			{ name: 'Remove Admin', value: 'removeAdmin', action: 'Remove group admin' },
			{ name: 'Remove Group Participant', value: 'removeGroupParticipant', action: 'Remove group participant' },
			{ name: 'Set Group Admin', value: 'setGroupAdmin', action: 'Set group admin' },
			{ name: 'Update Group Name', value: 'updateGroupName', action: 'Update group name' },
		],
		default: 'getGroupData',
	},
];