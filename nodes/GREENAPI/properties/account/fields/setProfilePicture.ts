import { INodeProperties } from 'n8n-workflow';

export const setProfilePictureFields: INodeProperties[] = [
    {
		displayName: 'filePath',
		name: 'filePath',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setProfilePicture'],
			},
		},
		placeholder: 'C:/path/to/image.jpg',
		description: 'Path to the JPG image for the group',
	},
]