
import {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
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

	/*
	methods = {
		credentialTest: {
			async validateConnection(
				this: ICredentialTestFunctions,
				credentials: ICredentialDataDecryptedObject,
			): Promise<INodeCredentialTestResult> {
				console.log('мы здесь!')
				try {
					const response = await this.helpers.request({
						url: `https://api.green-api.com/waInstance${credentials.idInstance}/getStateInstance/${credentials.apiTokenKey}`,
						method: 'GET',
						json: true,
					});

					if (response.stateInstance !== 'authorized') {
						return {
							status: 'Error',
							message: 'Instance is not authorized',
						};
					}

					return {
						status: 'OK',
						message: 'Connection successful!',
					};
				} catch (error: any) {
					return {
						status: 'Error',
						message: `Authentication failed: ${error.message}`,
					};
				}
			},
		},
	};*/

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.green-api.com/',
			url: '={{$baseURL}}/waInstance{{$credentials.idInstance}}/getStateInstance/{{$credentials.apiTokenKey}}',
			method: 'GET',
		},
		rules: [ // прописать все случаи expired, deleted
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