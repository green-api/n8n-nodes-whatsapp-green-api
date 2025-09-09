
import {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';
declare const console: any;


export class GreenApiAuth implements ICredentialType {
	name = 'GreenApiAuth';
	displayName = 'Green-API';

	documentationUrl = 'https://green-api.com/en/docs/api';

	properties: INodeProperties[] = [
		{
			displayName: 'idInstance',
			name: 'idInstance',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'apiTokenKey',
			name: 'apiTokenKey',
			type: 'string',
			required: true,
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.green-api.com/',
			url: '={{$baseURL}}/waInstance{{$credentials.idInstance}}/getStateInstance/{{$credentials.apiTokenKey}}',
			method: 'GET',
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'stateInstance',
					value: 'notAuthorized',
					message: 'Instance is not authorized!',
				},
			},
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'stateInstance',
					value: 'starting',
					message: 'Instance is in starting state!',
				},
			},
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'stateInstance',
					value: 'blocked',
					message: 'Instance is blocked!',
				},
			},
		],
	};
}