import { INodeProperties } from 'n8n-workflow';

export const sendLocationFields: INodeProperties[] = [
	{
		displayName: 'Location Name',
		name: 'nameLocation',
		type: 'string',
		default: '',
		placeholder: 'Office',
		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
	{
		displayName: 'Location Address',
		name: 'address',
		type: 'string',
		default: '',
		placeholder: '123456, Astana',
		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
	{
		displayName: 'Location Latitude',
		name: 'latitude',
		type: 'number',
		default: '',
		placeholder: '12.3456789',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
	{
		displayName: 'Location Longitude',
		name: 'longitude',
		type: 'number',
		default: '',
		placeholder: '10.1112131',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendLocation'],
			},
		},
	},
];