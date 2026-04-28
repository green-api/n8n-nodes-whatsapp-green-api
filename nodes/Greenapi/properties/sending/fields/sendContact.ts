import { INodeProperties } from 'n8n-workflow';

export const sendContactFields: INodeProperties[] = [
	{
		displayName: 'Phone Number',
		name: 'phoneContact',
		type: 'number',
		default: '',
		placeholder: '79000000000',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		default: '',
		placeholder: 'First name',
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
	{
		displayName: 'Middle Name',
		name: 'middleName',
		type: 'string',
		default: '',
		placeholder: 'Middle name',
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		default: '',
		placeholder: 'Last name',
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
	{
		displayName: 'Company',
		name: 'company',
		type: 'string',
		default: '',
		placeholder: 'Company name',
		displayOptions: {
			show: {
				operation: ['sendContact'],
			},
		},
	},
];