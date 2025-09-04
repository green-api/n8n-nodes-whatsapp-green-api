
import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
declare const console: any;


export class GreenApiAuth implements ICredentialType {
	name = 'GreenApiAuth';
	displayName = 'Green-API Credentials';

	documentationUrl = 'https://green-api.com/en/docs';

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
			returnFullResponse: true,
			json: true,
		},
		rules: [ // ну тут вообще не работает
			{
				type: 'responseSuccessBody',
				properties: {
					message: 'wtf',
					key: 'wtf',
					value: 'wtf',
				},
			},
		],
	};
}