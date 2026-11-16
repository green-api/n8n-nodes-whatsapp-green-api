import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';
import { callWebhookSettings, webhookChatId } from './helpers/callWebhooks';

export class GreenapiTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREEN-API for WhatsApp Trigger',
		name: 'greenapiForWhatsAppTrigger',
		icon: 'file:greenapi.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow on a Green-Api webhook',
		defaults: {
			name: 'GREENAPI Trigger',
		},
		inputs: [],
		outputs: ['main'],
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
				hint: 'Types of processed webhooks. All message types will be processed if none is selected.',
				type: 'multiOptions',
				options: [
					{
						name: 'Incoming Call',
						value: 'incomingCall',
						description: 'Trigger on incoming call events: ringing, answered, ended',
					},
					{
						name: 'Incoming Message',
						value: 'incomingMessageReceived',
						description: 'Trigger on new incoming message',
					},
					{
						name: 'Outgoing Call',
						value: 'outgoingCall',
						description: 'Trigger on outgoing call events: calling, answered, ended',
					},
					{
						name: 'Outgoing Message Sent From API',
						value: 'outgoingAPIMessageReceived',
						description: 'Trigger on new outgoing message sent from API',
					},
					{
						name: 'Outgoing Message Sent From Phone',
						value: 'outgoingMessageReceived',
						description: 'Trigger on new outgoing message sent from phone',
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

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'greenApiAuthApi',
					{
						method: 'GET',
						url: `https://api.green-api.com/waInstance${credentials.idInstance}/getSettings/${credentials.apiTokenKey}`,
					},
				);
				const callSettings = callWebhookSettings(this.getNodeParameter('webhookType', []) as string[]);
				return response.webhookUrl === webhookUrl &&
					Object.entries(callSettings).every(([setting, value]) => response[setting] === value);
			},

			async create(this: IHookFunctions): Promise<void> {
				const credentials = await this.getCredentials('greenApiAuthApi');
				const webhookUrl = this.getNodeWebhookUrl('default');

				await this.helpers.httpRequestWithAuthentication.call(
					this,
					'greenApiAuthApi',
					{
						method: 'POST',
						url: `https://api.green-api.com/waInstance${credentials.idInstance}/setSettings/${credentials.apiTokenKey}`,
						body: {
							webhookUrl: webhookUrl,
							incomingWebhook: 'yes',
							outgoingAPIMessageWebhook: 'yes',
							outgoingMessageWebhook: 'yes',
							...callWebhookSettings(this.getNodeParameter('webhookType', []) as string[]),
						},
						json: true,
					},
				);
			},

			async delete(this: IHookFunctions): Promise<void> {
				const credentials = await this.getCredentials('greenApiAuthApi');

				await this.helpers.httpRequestWithAuthentication.call(
					this,
					'greenApiAuthApi',
					{
						method: 'POST',
						url: `https://api.green-api.com/waInstance${credentials.idInstance}/setSettings/${credentials.apiTokenKey}`,
						body: {
							webhookUrl: '',
						},
						json: true,
					},
				);
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const typeWebhook = [
			'incomingMessageReceived',
			'outgoingAPIMessageReceived',
			'outgoingMessageReceived',
		];
		const body = this.getBodyData();
		const data = this.helpers.returnJsonArray(body);
		const thisTypeWebhook = data[0].json.typeWebhook as string;
		const chosenTypeWebhook = this.getNodeParameter('webhookType', []) as string[];

		if (
			(Array.isArray(chosenTypeWebhook) && chosenTypeWebhook.includes(thisTypeWebhook)) ||
			(chosenTypeWebhook.length === 0 && typeWebhook.includes(thisTypeWebhook))
		) {
			const chatType = this.getNodeParameter('chatType') as string;
			const thisChatWebhook = webhookChatId(data[0].json as any);
			const thisMessageChatType = thisChatWebhook.slice(-4);
			let thisChatType!: string;

			if (thisMessageChatType === 'c.us') {
				thisChatType = 'chatReceiveRestriction';
			}
			if (thisMessageChatType === 'g.us') {
				thisChatType = 'groupReceiveRestriction';
			}

			const chatsCollection = this.getNodeParameter('chatIds', 0, {}) as {
				chatId: { chatId: string }[];
			};
			const chats = (chatsCollection.chatId || []).map((c) => c.chatId);

			if (
				((Array.isArray(chats) && chats.includes(thisChatWebhook)) || chats.length === 0) &&
				(chatType === thisChatType || chatType === 'noReceiveRestriction')
			) {
				if (thisTypeWebhook === 'incomingMessageReceived') {
					const messageData = (data[0].json as any).messageData;
					let unifiedMessageText = '';

					if (messageData.typeMessage === 'textMessage') {
						unifiedMessageText = messageData.textMessageData.textMessage;
					} else if (messageData.typeMessage === 'extendedTextMessage') {
						unifiedMessageText = messageData.extendedTextMessageData.text;
					}

					data[0].json.unifiedMessageText = unifiedMessageText;
				}
				return {
					workflowData: [data],
					webhookResponse: 'OK',
				};
			}
		}
		return {
			webhookResponse: 'OK',
		};
	}
}
