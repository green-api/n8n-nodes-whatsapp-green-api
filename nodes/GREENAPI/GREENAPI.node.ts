import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import properties from './properties';
import { sendMessage } from './operations/sendMessage';
import { sendFileByUrl } from './operations/sendFileByUrl';
import { sendPoll } from './operations/sendPoll';
import { getChatHistory } from './operations/getChatHistory';
import { getContacts } from './operations/getContacts';
import { checkWhatsapp } from './operations/checkWhatsapp';
import { getAvatar } from './operations/getAvatar';
import { lastOutgoingMessages } from './operations/lastOutgoingMessages';
import { lastIncomingMessages } from './operations/lastIncomingMessages';
import { getGroupData } from './operations/getGroupData';
import { sendInteractiveButtons } from './operations/sendInteractiveButtons';
import { sendInteractiveButtonsReply } from './operations/sendInteractiveButtonsReply';
//declare const console: any;



export class GREENAPI implements INodeType {
//export class GREEN_API implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREEN-API for WhatsApp',
		name: 'GREENAPI',
		icon: 'file:greenapi.svg',
		group: ['transform'],
		version: 1,
		description: 'Node description', /// ##### !!!!!!!!
 		defaults: {
			name: 'GREENAPI',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'GreenApiAuth',
				required: true,
			},
		],
		properties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		switch(operation){
			case 'sendMessage':
				responseData = await sendMessage.call(this, items);
				returnData.push(...responseData);
				break;
			case 'sendFileByUrl':
				responseData = await sendFileByUrl.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getChatHistory':
				responseData = await getChatHistory.call(this, items);
				returnData.push(...responseData);
				break;
			case 'sendPoll':
				responseData = await sendPoll.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getContacts':
				responseData = await getContacts.call(this, items);
				returnData.push(...responseData);
				break;
			case 'lastIncomingMessages':
				responseData = await lastIncomingMessages.call(this, items);
				returnData.push(...responseData);
				break;
			case 'lastOutgoingMessages':
				responseData = await lastOutgoingMessages.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getAvatar':
				responseData = await getAvatar.call(this, items);
				returnData.push(...responseData);
				break;
			case 'checkWhatsapp':
				responseData = await checkWhatsapp.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getGroupData':
				responseData = await getGroupData.call(this, items);
				returnData.push(...responseData);
				break;
			case 'sendInteractiveButtons':
				responseData = await sendInteractiveButtons.call(this, items);
				returnData.push(...responseData);
				break;	
			case 'sendInteractiveButtonsReply':{
				responseData = await sendInteractiveButtonsReply.call(this, items);
				returnData.push(...responseData);
				break;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];	
	}

	
}