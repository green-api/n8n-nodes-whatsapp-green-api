import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import properties from './properties';



//sending
import { sendMessage } from './operations/sendMessage';
import { sendFileByUrl } from './operations/sendFileByUrl';
import { sendFileByUpload } from './operations/sendFileByUpload';
import { uploadFile } from './operations/uploadFile';
import { sendPoll } from './operations/sendPoll';
import { sendInteractiveButtons } from './operations/sendInteractiveButtons';
import { sendInteractiveButtonsReply } from './operations/sendInteractiveButtonsReply';
import { forwardMessages } from './operations/forwardMessages';
import { sendContact } from './operations/sendContact';
import { sendLocation } from './operations/sendLocation';

import { getChatHistory } from './operations/getChatHistory';
import { getContacts } from './operations/getContacts';
import { checkWhatsapp } from './operations/checkWhatsapp';
import { getAvatar } from './operations/getAvatar';
import { lastOutgoingMessages } from './operations/lastOutgoingMessages';
import { lastIncomingMessages } from './operations/lastIncomingMessages';




import { getSettings } from './operations/getSettings';
import { setProfilePicture } from './operations/setProfilePicture';
import { setSettings } from './operations/setSettings';
import { getStateInstance } from './operations/getStateInstance';
import { getWaSettings } from './operations/getWaSettings';
import { reboot } from './operations/reboot';
import { logout } from './operations/logout';

import { showMessagesQueue } from './operations/showMessagesQueue';
import { clearMessagesQueue } from './operations/clearMessagesQueue';



import { getMessage } from './operations/getMessage';

import { getContactInfo } from './operations/getContactInfo';
import { deleteMessage } from './operations/deleteMessage';
import { archiveChat } from './operations/archiveChat';
import { unarchiveChat } from './operations/unarchiveChat';
import { setDisappearingChat } from './operations/setDisappearingChat';
import { editMessage } from './operations/editMessage';
import { readChat } from './operations/readChat';

//groups
import { createGroup } from './operations/createGroup';
import { updateGroupName } from './operations/updateGroupName';
import { getGroupData } from './operations/getGroupData';
import { addGroupParticipant } from './operations/addGroupParticipant';
import { removeGroupParticipant } from './operations/removeGroupParticipant';
import { setGroupAdmin } from './operations/setGroupAdmin';
import { removeAdmin } from './operations/removeAdmin';
import { setGroupPicture } from './operations/setGroupPicture';
import { leaveGroup } from './operations/leaveGroup';

import { test } from './operations/test';

import { sendTextStatus } from './operations/statusMethods';
import { sendVoiceStatus } from './operations/statusMethods';
import { sendMediaStatus } from './operations/statusMethods';
import { deleteStatus } from './operations/statusMethods';
import { getOutgoingStatuses } from './operations/statusMethods';
import { getIncomingStatuses } from './operations/statusMethods';
import { getStatusStatistic } from './operations/statusMethods';

import { downloadFile } from './operations/downloadFile';
import { receiveNotification } from './operations/receiveDeleteNotification';
import { deleteNotification } from './operations/receiveDeleteNotification';

export class Greenapi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREEN-API for WhatsApp',
		name: 'greenapi',
		icon: 'file:greenapi.svg',
		group: ['transform'],
		version: 1,
		description: 'Send and receive WhatsApp messages using Green-API.',
 		defaults: {
			name: 'GREENAPI',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'greenApiAuthApi',
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
			case 'sendFileByUpload':
				responseData = await sendFileByUpload.call(this, items);
				returnData.push(...responseData);
				break;
			case 'uploadFile':
				responseData = await uploadFile.call(this, items);
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
			case 'sendInteractiveButtonsReply':
				responseData = await sendInteractiveButtonsReply.call(this, items);
				returnData.push(...responseData);
				break;
			
			
			
			case 'getSettings':
				responseData = await getSettings.call(this, items);
				returnData.push(...responseData);
				break;	
			case 'setProfilePicture':
				responseData = await setProfilePicture.call(this, items);
				returnData.push(...responseData);
				break;	
			case 'setSettings':
				responseData = await setSettings.call(this, items);
				returnData.push(...responseData);
				break;			
			case 'getStateInstance':
				responseData = await getStateInstance.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getWaSettings':
				responseData = await getWaSettings.call(this, items);
				returnData.push(...responseData);
				break;
			case 'reboot':
				responseData = await reboot.call(this, items);
				returnData.push(...responseData);
				break;
			case 'logout':
				responseData = await logout.call(this, items);
				returnData.push(...responseData);
				break;

			case 'sendContact':
				responseData = await sendContact.call(this, items);
				returnData.push(...responseData);
				break;
			case 'sendLocation':
				responseData = await sendLocation.call(this, items);
				returnData.push(...responseData);
				break;

			
			case 'showMessagesQueue':
				responseData = await showMessagesQueue.call(this, items);
				returnData.push(...responseData);
				break;			
			case 'clearMessagesQueue':
				responseData = await clearMessagesQueue.call(this, items);
				returnData.push(...responseData);
				break;


			case 'getMessage':
				responseData = await getMessage.call(this, items);
				returnData.push(...responseData);
				break;

			case 'checkWhatsapp':
				responseData = await checkWhatsapp.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getAvatar':
				responseData = await getAvatar.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getContacts':
				responseData = await getContacts.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getContactInfo':
				responseData = await getContactInfo.call(this, items);
				returnData.push(...responseData);
				break;
			case 'deleteMessage':
				responseData = await deleteMessage.call(this, items);
				returnData.push(...responseData);
				break;
			case 'archiveChat':
				responseData = await archiveChat.call(this, items);
				returnData.push(...responseData);
				break;
			case 'unarchiveChat':
				responseData = await unarchiveChat.call(this, items);
				returnData.push(...responseData);
				break;
			case 'setDisappearingChat':
				responseData = await setDisappearingChat.call(this, items);
				returnData.push(...responseData);
				break;
			case 'editMessage':
				responseData = await editMessage.call(this, items);
				returnData.push(...responseData);
				break;
			case 'readChat':
				responseData = await readChat.call(this, items);
				returnData.push(...responseData);
				break;


				
			case 'createGroup':
				responseData = await createGroup.call(this, items);
				returnData.push(...responseData);
				break;
			case 'updateGroupName':
				responseData = await updateGroupName.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getGroupData':
				responseData = await getGroupData.call(this, items);
				returnData.push(...responseData);
				break;
			case 'addGroupParticipant':
				responseData = await addGroupParticipant.call(this, items);
				returnData.push(...responseData);
				break;
			case 'removeGroupParticipant':
				responseData = await removeGroupParticipant.call(this, items);
				returnData.push(...responseData);
				break;
			case 'setGroupAdmin':
				responseData = await setGroupAdmin.call(this, items);
				returnData.push(...responseData);
				break;
			case 'removeAdmin':
				responseData = await removeAdmin.call(this, items);
				returnData.push(...responseData);
				break;
			case 'setGroupPicture':
				responseData = await setGroupPicture.call(this, items);
				returnData.push(...responseData);
				break;
			case 'leaveGroup':
				responseData = await leaveGroup.call(this, items);
				returnData.push(...responseData);
				break;

			case 'forwardMessages':
				responseData = await forwardMessages.call(this, items);
				returnData.push(...responseData);
				break;	



			case 'sendTextStatus':
				responseData = await sendTextStatus.call(this, items);
				returnData.push(...responseData);
				break;
			case 'sendMediaStatus':
				responseData = await sendMediaStatus.call(this, items);
				returnData.push(...responseData);
				break;
			case 'sendVoiceStatus':
				responseData = await sendVoiceStatus.call(this, items);
				returnData.push(...responseData);
				break;
			case 'deleteStatus':
				responseData = await deleteStatus.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getStatusStatistic':
				responseData = await getStatusStatistic.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getIncomingStatuses':
				responseData = await getIncomingStatuses.call(this, items);
				returnData.push(...responseData);
				break;
			case 'getOutgoingStatuses':
				responseData = await getOutgoingStatuses.call(this, items);
				returnData.push(...responseData);
				break;


			case 'downloadFile':
				responseData = await downloadFile.call(this, items);
				returnData.push(...responseData);
				break;
			case 'receiveNotification':
				responseData = await receiveNotification.call(this, items);
				returnData.push(...responseData);
				break;
			case 'deleteNotification':
				responseData = await deleteNotification.call(this, items);
				returnData.push(...responseData);
				break;
			

			case 'test':
				responseData = await test.call(this, items);
				returnData.push(...responseData);
				break;	
		}
		return [this.helpers.returnJsonArray(returnData)];	
	}

	
}