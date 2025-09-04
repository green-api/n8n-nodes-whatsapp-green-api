import type {
	IHookFunctions,
	IWebhookFunctions,
	//IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
declare const console: any;

export class GREENAPITrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREENAPI Trigger',
		name: 'GREENAPITrigger',
		icon: 'file:greenapi.svg',
		group: ['trigger'],
		version: 1,
		//subtitle: '=Updates: {{$parameter["updates"].join(", ")}}',
		description: 'Starts the workflow on a Telegram update',
		defaults: {
			name: 'GREENAPI Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'GreenApiAuth',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName:
					'Due to Telegram API limitations, you can use just one Telegram trigger for each bot at a time',
				name: 'telegramTriggerNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Trigger On',
				name: 'updates',
				hint: 'if none is chosen, all types will be processed',//!!!!
				type: 'multiOptions',
				options: [
					{
						name: 'Incoming message',
						value: 'incomingMessageReceived',
						description: 'Trigger on new incoming message',
					},
					{
						name: 'Outgoing message sent from phone',
						value: 'outgoingMessageReceived',
						description:
							'Trigger on new outgoing message sent from phone',
					},
					{
						name: 'outgoing message status',
						value: 'outgoingMessageStatus',
						description: 'Trigger on new sent message status',
					},
				],
				required: false,
				default: [],
			},
			{
				displayName:
					'Every uploaded attachment, even if sent in a group, will trigger a separate event. You can identify that an attachment belongs to a certain group by <code>media_group_id</code> .',
				name: 'attachmentNotice',
				type: 'notice',
				default: '',
			},
            {
				displayName: 'Restrict to Chat IDs',
				name: 'chatIds',
				type: 'fixedCollection',
				placeholder: 'Add chatId',
				default: {},
                typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'chatId',
						name: 'chatId',
						values: [
							{
								displayName: 'chatId',
                                name: 'chatId',
                                type: 'string',
                                default: '',
                                placeholder: '79000000000@c.us',
							},
						],
					},
				],
			},
		],
	};


    webhookMethods: any = {
        default: {

            async checkExists(this: IHookFunctions): Promise<boolean> {  // setSettings webhookUrl
                console.log('>>> [MyApiTrigger] CHECKEXISTS called!');
                const credentials = await this.getCredentials('GreenApiAuth'); // если нужны креды
                const webhookUrl = this.getNodeWebhookUrl('default');
				console.log(webhookUrl);

                // Регистрируем вебхук во внешнем API
                const response = await this.helpers.request({
                    method: 'GET',
                    uri: `https://api.green-api.com/waInstance${credentials.idInstance}/getSettings/${credentials.apiTokenKey}`,
                });
				return response.webhookUrl === webhookUrl;
            },

            async create(this: IHookFunctions): Promise<void> {
				console.log('>>> [MyApiTrigger] CREATE called!');
                const credentials = await this.getCredentials('GreenApiAuth');  
				const webhookUrl = this.getNodeWebhookUrl('default');
                
                await this.helpers.request({
                    method: 'POST',
                    uri: `https://api.green-api.com/waInstance${credentials.idInstance}/setSettings/${credentials.apiTokenKey}`,
                    body: {
                        webhookUrl: webhookUrl,
                    },
                    json: true,
                });
            },

			async delete(this: IHookFunctions): Promise<void> { 
				console.log('>>> [MyApiTrigger] DELETE called!');
                const credentials = await this.getCredentials('GreenApiAuth');
                
                await this.helpers.request({
                    method: 'POST',
                    uri: `https://api.green-api.com/waInstance${credentials.idInstance}/setSettings/${credentials.apiTokenKey}`,
                    body: {
                        webhookUrl: "",
                    },
                    json: true,
                });
            },
        }
    }
    
    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const typeWebhook = [
			'incomingMessageReceived', 
			'outgoingAPIMessageReceived', 
			'outgoingMessageReceived', 
			'outgoingMessageStatus', 
			'incomingBlock', 
			'incomingCall', 
			'stateInstanceChanged', 
			'quotaExceeded'
		];

        const body = this.getBodyData();
		const data = this.helpers.returnJsonArray(body);

		const params = this.getNodeParameter('updates', []) as string[];
		const thisTypeWebhook = data[0].json.typeWebhook as string; //проверка на typeWebhook

		console.log(params);
		console.log(thisTypeWebhook)

		const chats = this.getNodeParameter('updates', []) as string[];
		const thisChatWebhook = (data[0].json as any).senderData.chatId as string; 

		if(typeWebhook.includes(thisTypeWebhook)){
			if ((Array.isArray(params) && params.includes(thisTypeWebhook)) || (params.length === 0)){
				if ((Array.isArray(chats) && chats.includes(thisChatWebhook)) || (chats.length === 0)){
					return {
						workflowData: [this.helpers.returnJsonArray(body),],
						webhookResponse: 'OK',
					};
				}
			}
		}
		return {
			webhookResponse: 'OK',
		};
	}
}