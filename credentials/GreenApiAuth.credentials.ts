import {
	//IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GreenApiAuth implements ICredentialType {
	name = 'GreenApiAuth';
	displayName = 'Green-API Credentials';

	documentationUrl = 'https://green-api.com/en/docs';

	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
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

	// This credential is currently not used by any node directly
	// but the HTTP Request node can use it to make requests.
	// The credential is also testable due to the `test` property below
	
	//####
	
	/*authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{ $credentials.username }}',
				password: '={{ $credentials.password }}',
			},
			qs: {
				// Send this as part of the query string
				n8n: 'rocks',
			},
		},
	};*/

	//####


	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.green-api.com/',
			url: '={{$baseURL}}/waInstance{{$credentials.idInstance}}/getStateInstance/{{$credentials.apiTokenKey}}',
			method: 'GET'
		},
	};
}
