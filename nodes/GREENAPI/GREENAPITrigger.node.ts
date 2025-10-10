import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
declare const console: any;

export class GreenapiTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREEN-API Trigger',
		name: 'greenapiTrigger',
		icon: 'file:greenapi.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow on a Green-Api webhook',
		defaults: {
			name: 'GREENAPI Trigger',

		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'greenApiAuthApi',
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
					'Applying the settings, which is necessary for trigger node to work, to an instance can take up to 5 minutes.',
				name: 'GreenApiTriggerNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Trigger On',
				name: 'webhookType',
				hint: 'Types of processed webhooks. All types will be processed if none is selected.',
				type: 'multiOptions',
				options: [
					{
						name: 'Incoming Message',
						value: 'incomingMessageReceived',
						description: 'Trigger on new incoming message',
					},
					{
						name: 'Outgoing Message Sent From Phone',
						value: 'outgoingMessageReceived',
						description:
							'Trigger on new outgoing message sent from phone',
					},
					{
						name: 'Outgoing Message Sent From API',
						value: 'outgoingAPIMessageReceived',
						description: 'Trigger on new outgoing message sent from API',
					},
				],

				default: [],
			},
			{
				displayName: 'Restrictions on Receiving',
				name: 'chatType',
				hint: 'Process webhooks based on messages from personal/group chats only.',
				type: 'options',
				options: [
					{
						name: 'Receive All',
						value: 'noReceiveRestriction',
						description: 'Process webhooks from all chats',
					},
					{
						name: 'Only From Chats',
						value: 'chatReceiveRestriction',
						description: 'Process webhooks only from personal chats',
					},
					{
						name: 'Only From Groups',
						value: 'groupReceiveRestriction',
						description: 'Process webhooks only from group chats',
					},
				],
				required: true,
				default: 'noReceiveRestriction',
			},
            {
				displayName: 'Restrict to Chat IDs',
				hint: 'Process webhooks only from the specified chats.',
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
                const credentials = await this.getCredentials('greenApiAuthApi');
                const webhookUrl = this.getNodeWebhookUrl('default');
				console.log(webhookUrl);

                const response = await this.helpers.request({
                    method: 'GET',
                    uri: `https://api.green-api.com/waInstance${credentials.idInstance}/getSettings/${credentials.apiTokenKey}`,
                });
				return response.webhookUrl === webhookUrl;
            },

            async create(this: IHookFunctions): Promise<void> {
                const credentials = await this.getCredentials('greenApiAuthApi');  
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
                const credentials = await this.getCredentials('greenApiAuthApi');
                
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
			//'outgoingMessageStatus', 
			//'incomingBlock', 
			//'incomingCall', 
			//'stateInstanceChanged', 
			//'quotaExceeded'
		];
        const body = this.getBodyData();
		const data = this.helpers.returnJsonArray(body);
		const thisTypeWebhook = data[0].json.typeWebhook as string;
		const chosenTypeWebhook = this.getNodeParameter('webhookType', []) as string[];

		if ((Array.isArray(chosenTypeWebhook) && chosenTypeWebhook.includes(thisTypeWebhook)) || (chosenTypeWebhook.length === 0) && typeWebhook.includes(thisTypeWebhook)){

			const chatType = this.getNodeParameter('chatType') as string;
			const thisMessageChatType = ((data[0].json as any).senderData.chatId).slice(-4) as string;
			let thisChatType!: string;
			if(thisMessageChatType === 'c.us'){
				thisChatType = 'chatReceiveRestriction'
			}
			if(thisMessageChatType === 'g.us'){
				thisChatType = 'groupReceiveRestriction'
			}

			const chatsCollection = this.getNodeParameter('chatIds', 0, {}) as {
				chatId: { chatId: string }[];
			};
			const chats = (chatsCollection.chatId || []).map(c => c.chatId);
			const thisChatWebhook = (data[0].json as any).senderData.chatId as string; 

			if (((Array.isArray(chats) && chats.includes(thisChatWebhook)) || (chats.length === 0)) && ((chatType === thisChatType) || (chatType === 'noReceiveRestriction'))){ 
				return {
					workflowData: [this.helpers.returnJsonArray(body),],
					webhookResponse: 'OK',
				};
			}
		}
		return {
			webhookResponse: 'OK',
		};
	}
}