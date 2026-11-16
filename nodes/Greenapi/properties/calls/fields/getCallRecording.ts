import { INodeProperties } from 'n8n-workflow';

export const getCallRecordingFields: INodeProperties[] = [
	{
		displayName: 'Call ID',
		name: 'idMessage',
		type: 'string',
		default: '',
		placeholder: 'AC88AD4AA553FCBB95BEB6BF98F704B1',
		description: 'The idMessage of the call from the call webhook or the call journal',
		required: true,
		displayOptions: {
			show: {
				resource: ['calls'],
				operation: ['getCallRecording'],
			},
		},
	},
];
