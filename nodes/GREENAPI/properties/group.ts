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
            { name: 'createGroup', value: 'createGroup', action: 'Create a group' },
            { name: 'updateGroupName', value: 'updateGroupName', action: 'Update group name' },
            { name: 'getGroupData', value: 'getGroupData', action: 'Get group data' },
            { name: 'addGroupParticipant', value: 'addGroupParticipant', action: 'Add group participant' },
            { name: 'removeGroupParticipant', value: 'removeGroupParticipant', action: 'Remove group participant' },
            { name: 'setGroupAdmin', value: 'setGroupAdmin', action: 'Set group admin' },
            { name: 'removeAdmin', value: 'removeAdmin', action: 'Remove group admin' },
            { name: 'setGroupPicture', value: 'setGroupPicture', action: 'Set group picture' },
            { name: 'leaveGroup', value: 'leaveGroup', action: 'Leave group' },
        ],
        default: 'getGroupData',
    },
    
    {
        displayName: 'groupId',
        name: 'groupId',
        placeholder: '12345678901234567890@g.us',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['group',],
                operation: ['updateGroupName', 'getGroupData', 'addGroupParticipant', 'removeGroupParticipant', 
                    'setGroupAdmin', 'removeAdmin', 'setGroupPicture', 'leaveGroup', 'setGroupPicture']
            },
        },
        required: true,
    },

    {
        displayName: 'groupName',
        name: 'groupName',
        placeholder: 'Group name',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['group',],
                operation: ['createGroup', 'updateGroupName',]
            },
        },
        required: true,
    },

    {
        displayName: 'participantChatId',
        name: 'participantChatId',
        placeholder: '79000000000@c.us',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['group',],
                operation: ['addGroupParticipant', 'updateGroupName', 'addGroupParticipant', 'removeGroupParticipant', 'setGroupAdmin', 'removeAdmin',]
            },
        },
        required: true,
    },

    {
        displayName: 'chatIds',
        name: 'chatIds',
        type: 'fixedCollection',
        placeholder: 'Add chatId',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        required: true,
        options: [
            {
                displayName: 'chatId',
                name: 'chatId',
                values: [
                    {
                        displayName: 'chatId',
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
                resource: ['group',],
                operation: ['createGroup'],
            },
        },
    },
    {
		displayName: 'Group Image',
		name: 'file',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['setGroupPicture'],
			},
		},
		placeholder: 'C:/path/to/image.jpg',
		description: 'Path to the JPG image for the group',
	},
];
