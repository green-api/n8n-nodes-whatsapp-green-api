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
		//subtitle: '=Updates: {{$parameter["updates"].join(", ")}}', // это что вообще??
		description: 'Starts the workflow on a Telegram update', // tElEgRaM7?
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
					'Due to Telegram API limitations, you can use just one Telegram trigger for each bot at a time', // tElEgRaM7?
				name: 'telegramTriggerNotice', //
				type: 'notice', //
				default: '', //
			},
			{
				displayName: 'Trigger On',
				name: 'webhookType',
				hint: 'if none is chosen, all types will be processed',// как будто не очень звучит
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
						name: 'outgoing message sent from API',
						value: 'outgoingAPIMessageReceived',
						description: 'Trigger on new outgoing message sent from API',
					},
				],
				required: false,
				default: 'incomingMessageReceived',
			},
			{
				displayName: 'Receiving from',
				name: 'chatType',
				hint: 'if none is chosen, all types will be processed',//!!!!
				type: 'options',
				options: [
					{
						name: 'Receive all',
						value: 'noReceiveRestriction',
						description: 'Trigger on new sent message status', //
					},
					{
						name: 'Only from chats',
						value: 'chatReceiveRestriction',
						description: 'Trigger on new incoming message', //
					},
					{
						name: 'Only from groups',
						value: 'groupReceiveRestriction',
						description:
							'Trigger on new outgoing message sent from phone', //
					},
				],
				required: true,
				default: 'noReceiveRestriction',
			},
			{
				displayName:
					'Every uploaded attachment, even if sent in a group, will trigger a separate event. You can identify that an attachment belongs to a certain group by <code>media_group_id</code> .',
				name: 'attachmentNotice', //
				type: 'notice', //
				default: '', //
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

            async checkExists(this: IHookFunctions): Promise<boolean> {
                console.log('>>> [MyApiTrigger] CHECKEXISTS called!');
                const credentials = await this.getCredentials('GreenApiAuth');
                const webhookUrl = this.getNodeWebhookUrl('default');
				console.log(webhookUrl);

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
						incomingWebhook: 'yes',
						outgoingAPIMessageWebhook: 'yes',
    					outgoingMessageWebhook: 'yes',
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
                        //webhookUrl: "", //насколько нужно удалять вебхук... хмммм... наверное, не нужно
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


		// тип вебхука (входящее, исходящее и т.д.)
		const params = this.getNodeParameter('webhookType', []) as string[];
		const thisTypeWebhook = data[0].json.typeWebhook as string;


		// тип чата (личный, группа)
		const chatType = this.getNodeParameter('chatType') as string;
		const thisMessageChatType = ((data[0].json as any).senderData.chatId).slice(-4) as string;
		let thisChatType!: string;
		if(thisMessageChatType === 'c.us'){
			thisChatType = 'chatReceiveRestriction'
		}
		if(thisMessageChatType === 'g.us'){
			thisChatType = 'groupReceiveRestriction'
		}

		// список разрешенных чатов по chatId
		const chatsCollection = this.getNodeParameter('chatIds', 0, {}) as {
            chatId: { chatId: string }[];
        };
        const chats = (chatsCollection.chatId || []).map(c => c.chatId);
		const thisChatWebhook = (data[0].json as any).senderData.chatId as string; 

		if(typeWebhook.includes(thisTypeWebhook)){
			if ((Array.isArray(params) && params.includes(thisTypeWebhook)) || (params.length === 0)){ // проверка на тип вебхука
				if ((Array.isArray(chats) && chats.includes(thisChatWebhook)) || (chats.length === 0)){ // проверка на разрешенный чат
					if ((chatType === thisChatType) || (chatType === 'noReceiveRestriction')){ // проверка на тип чата
						return {
							workflowData: [this.helpers.returnJsonArray(body),],
							webhookResponse: 'OK',
						};
					}
				}
			}
		}
		return {
			webhookResponse: 'OK',
		};
	}
}