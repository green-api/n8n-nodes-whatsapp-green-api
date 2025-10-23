
import {
    ICredentialType,
    INodeProperties,
    ICredentialTestRequest,
} from 'n8n-workflow';


export class GreenApiPartnerAuthApi implements ICredentialType {
    name = 'greenApiPartnerAuthApi';
    displayName = 'Green-API Partner API';

    documentationUrl = 'https://green-api.com/en/docs/partners';

    properties: INodeProperties[] = [
        {
            displayName: 'partnerToken',
            name: 'partnerToken',
            type: 'string',
												typeOptions: { password: true },
            required: true,
            default: '',
        }
    ];

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.green-api.com/',
            url: '={{$baseURL}}/partner/getInstances/{{$credentials.partnerToken}}/',
            method: 'GET',
        },
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'code',
					value: '401',
					message: 'Incorrect partner key!',
				},
			},
		],
    };
}