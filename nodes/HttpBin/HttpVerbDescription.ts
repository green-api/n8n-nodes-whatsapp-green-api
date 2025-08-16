import { INodeProperties } from 'n8n-workflow';


// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const httpVerbOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		options: [
			{
				name: 'sendMessage',
				value: 'sendMessage',
				description: 'sendMessage',
				action: 'sendMessage',
			},
			{
				name: 'sendFileByUrl',
				value: 'sendFileByUrl',
				description: 'sendFileByUrl',
				action: 'sendFileByUrl',
			}
		],
		default: 'get',
	},
];



// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
const Parameters: INodeProperties[] = [
	{
		displayName: 'chatId',
		name: 'chatId',
		type: 'string',
		default: '',
		required: true,
		description: 'chatId',
		/*displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['get'],
			},
		},*/
	},
	{
		displayName: 'message',
		name: 'message',
		type: 'string',
		default: '',
		required: true,
		description: 'message',
		displayOptions: {
			show: {
				operation: ['sendMessage'],
			},
		},
	},
	{
		displayName: 'fileName',
		name: 'fileName',
		type: 'string',
		default: '',
		required: true,
		description: 'fileName',
		displayOptions: {
			show: {
				operation: ['sendFileByUrl'],
			},
		},
	},
	{
		displayName: 'downloadUrl',
		name: 'downloadUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'downloadUrl',
		displayOptions: {
			show: {
				operation: ['sendFileByUrl'],
			},
		},
	},
];


export const httpVerbFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                httpVerb:get                                */
	/* -------------------------------------------------------------------------- */
	...Parameters

	/* -------------------------------------------------------------------------- */
	/*                              httpVerb:delete                               */
	/* -------------------------------------------------------------------------- */
];
