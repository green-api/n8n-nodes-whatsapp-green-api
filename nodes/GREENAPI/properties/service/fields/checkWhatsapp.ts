import { INodeProperties } from 'n8n-workflow';

export const checkWhatsappFields: INodeProperties[] = [
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'number',
		default: '',
		placeholder: '79000000000',
		required: true,
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['checkWhatsapp'],
			},
		},
	},
];