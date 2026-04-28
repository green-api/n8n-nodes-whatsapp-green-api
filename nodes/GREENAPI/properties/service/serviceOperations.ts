import { INodeProperties } from 'n8n-workflow';

export const serviceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['service'],
			},
		},
		options: [
			{ name: 'Archive Chat', value: 'archiveChat', action: 'Archive a chat' },
			{ name: 'Check WhatsApp', value: 'checkWhatsapp', action: 'Check whats app account availability' },
			{ name: 'Delete Message', value: 'deleteMessage', action: 'Delete a message' },
			{ name: 'Edit Message', value: 'editMessage', action: 'Edit the text message' },
			{ name: 'Get Avatar', value: 'getAvatar', action: 'Get avatar' },
			{ name: 'Get Contact Info', value: 'getContactInfo', action: 'Get contact info' },
			{ name: 'Get Contacts', value: 'getContacts', action: 'Get contacts' },
			{ name: 'Read Chat', value: 'readChat', action: 'Mark chat as read' },
			{ name: 'Set Disappearing Chat', value: 'setDisappearingChat', action: 'Change the settings of disappearing chat messages' },
			{ name: 'Unarchive Chat', value: 'unarchiveChat', action: 'Unarchive a chat' },
		],
		default: 'getContacts',
	},
];