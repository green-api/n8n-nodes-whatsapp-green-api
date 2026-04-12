import { INodeProperties } from 'n8n-workflow';

export const sharedFields: INodeProperties[] = [
	{
		displayName: 'groupId',
		name: 'groupId',
		type: 'string',
		default: '',
		placeholder: '12345678901234567890@g.us',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: [
					'updateGroupName',
					'getGroupData',
					'addGroupParticipant',
					'removeGroupParticipant',
					'setGroupAdmin',
					'removeAdmin',
					'setGroupPicture',
					'leaveGroup',
				],
			},
		},
	},
	{
		displayName: 'participantChatId',
		name: 'participantChatId',
		type: 'string',
		default: '',
		placeholder: '79000000000@c.us',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: [
					'addGroupParticipant',
					'removeGroupParticipant',
					'setGroupAdmin',
					'removeAdmin',
				],
			},
		},
	},
];