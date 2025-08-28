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

//  import { GreenApi } from './GenericFunctions';

/*import { apiRequest, getSecretToken } from './GenericFunctions';
import type { IEvent } from './IEvent';
import { downloadFile } from './util/triggerUtils';*/

export class GREENAPITrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREENAPI Trigger',
		name: 'GREENAPITrigger',
		//icon: 'file:telegram.svg',
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
				type: 'multiOptions',
				options: [
					{
						name: '*',
						value: '*',
						description: 'All updates',
					},
					{
						name: 'Incoming message',
						value: 'incoming',
						description: 'Trigger on new incoming message',
					},
					{
						name: 'Outgoing message sent from phone',
						value: 'outgoing',
						description:
							'Trigger on new outgoing message sent from phone',
					},
				],
				required: true,
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
        const body = this.getBodyData();

        return {
            workflowData: [this.helpers.returnJsonArray(body),],
        };
    };
}