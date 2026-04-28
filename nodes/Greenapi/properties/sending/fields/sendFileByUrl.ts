import { INodeProperties } from 'n8n-workflow';

export const sendFileByUrlFields: INodeProperties[] = [
	{
		displayName: 'URL File',
		name: 'urlFile',
		type: 'string',
		default: '',
		placeholder: 'https://my.site.com/my/image.jpg',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendFileByUrl'],
			},
		},
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		default: '',
		placeholder: 'image.jpg',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendFileByUrl'],
			},
		},
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['sendFileByUrl'],
			},
		},
	},
];