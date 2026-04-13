import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import properties from './properties';

// sending
import { sendMessage } from './operations/sendMessage';
import { sendFileByUrl } from './operations/sendFileByUrl';
import { sendPoll } from './operations/sendPoll';
import { sendInteractiveButtons } from './operations/sendInteractiveButtons';
import { sendInteractiveButtonsReply } from './operations/sendInteractiveButtonsReply';
import { forwardMessages } from './operations/forwardMessages';
import { sendContact } from './operations/sendContact';
import { sendLocation } from './operations/sendLocation';

// journal
import { getChatHistory } from './operations/getChatHistory';
import { getMessage } from './operations/getMessage';
import { lastIncomingMessages } from './operations/lastIncomingMessages';
import { lastOutgoingMessages } from './operations/lastOutgoingMessages';

// account
import { getSettings } from './operations/getSettings';
import { setSettings } from './operations/setSettings';
import { getStateInstance } from './operations/getStateInstance';
import { getWaSettings } from './operations/getWaSettings';
import { reboot } from './operations/reboot';
import { logout } from './operations/logout';

// service
import { getContacts } from './operations/getContacts';
import { getContactInfo } from './operations/getContactInfo';
import { checkWhatsapp } from './operations/checkWhatsapp';
import { getAvatar } from './operations/getAvatar';
import { deleteMessage } from './operations/deleteMessage';
import { editMessage } from './operations/editMessage';
import { readChat } from './operations/readChat';
import { archiveChat } from './operations/archiveChat';
import { unarchiveChat } from './operations/unarchiveChat';
import { setDisappearingChat } from './operations/setDisappearingChat';
import { downloadFile } from './operations/downloadFile';

// queue
import { showMessagesQueue } from './operations/showMessagesQueue';
import { clearMessagesQueue } from './operations/clearMessagesQueue';

// group
import { createGroup } from './operations/createGroup';
import { updateGroupName } from './operations/updateGroupName';
import { getGroupData } from './operations/getGroupData';
import { addGroupParticipant } from './operations/addGroupParticipant';
import { removeGroupParticipant } from './operations/removeGroupParticipant';
import { setGroupAdmin } from './operations/setGroupAdmin';
import { removeAdmin } from './operations/removeAdmin';
import { leaveGroup } from './operations/leaveGroup';

// status
import { sendTextStatus } from './operations/sendTextStatus';
import { sendVoiceStatus } from './operations/sendVoiceStatus';
import { sendMediaStatus } from './operations/sendMediaStatus';
import { deleteStatus } from './operations/deleteStatus';
import { getStatusStatistic } from './operations/getStatusStatistic';
import { getOutgoingStatuses } from './operations/getOutgoingStatuses';
import { getIncomingStatuses } from './operations/getIncomingStatuses';

export class Greenapi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREEN-API for WhatsApp',
		name: 'greenapi',
		icon: 'file:greenapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
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
		const operation = this.getNodeParameter('operation', 0) as string;
		let responseData: INodeExecutionData[] = [];

		switch (operation) {
			// sending
			case 'sendMessage':            responseData = await sendMessage.call(this, items); break;
			case 'sendFileByUrl':          responseData = await sendFileByUrl.call(this, items); break;
			case 'sendPoll':               responseData = await sendPoll.call(this, items); break;
			case 'sendInteractiveButtons': responseData = await sendInteractiveButtons.call(this, items); break;
			case 'sendInteractiveButtonsReply': responseData = await sendInteractiveButtonsReply.call(this, items); break;
			case 'forwardMessages':        responseData = await forwardMessages.call(this, items); break;
			case 'sendContact':            responseData = await sendContact.call(this, items); break;
			case 'sendLocation':           responseData = await sendLocation.call(this, items); break;

			// journal
			case 'getChatHistory':         responseData = await getChatHistory.call(this, items); break;
			case 'getMessage':             responseData = await getMessage.call(this, items); break;
			case 'lastIncomingMessages':   responseData = await lastIncomingMessages.call(this, items); break;
			case 'lastOutgoingMessages':   responseData = await lastOutgoingMessages.call(this, items); break;

			// account
			case 'getSettings':            responseData = await getSettings.call(this, items); break;
			case 'setSettings':            responseData = await setSettings.call(this, items); break;
			case 'getStateInstance':       responseData = await getStateInstance.call(this, items); break;
			case 'getWaSettings':          responseData = await getWaSettings.call(this, items); break;
			case 'reboot':                 responseData = await reboot.call(this, items); break;
			case 'logout':                 responseData = await logout.call(this, items); break;

			// service
			case 'getContacts':            responseData = await getContacts.call(this, items); break;
			case 'getContactInfo':         responseData = await getContactInfo.call(this, items); break;
			case 'checkWhatsapp':          responseData = await checkWhatsapp.call(this, items); break;
			case 'getAvatar':              responseData = await getAvatar.call(this, items); break;
			case 'deleteMessage':          responseData = await deleteMessage.call(this, items); break;
			case 'editMessage':            responseData = await editMessage.call(this, items); break;
			case 'readChat':               responseData = await readChat.call(this, items); break;
			case 'archiveChat':            responseData = await archiveChat.call(this, items); break;
			case 'unarchiveChat':          responseData = await unarchiveChat.call(this, items); break;
			case 'setDisappearingChat':    responseData = await setDisappearingChat.call(this, items); break;
			case 'downloadFile':           responseData = await downloadFile.call(this, items); break;

			// queue
			case 'showMessagesQueue':      responseData = await showMessagesQueue.call(this, items); break;
			case 'clearMessagesQueue':     responseData = await clearMessagesQueue.call(this, items); break;

			// group
			case 'createGroup':            responseData = await createGroup.call(this, items); break;
			case 'updateGroupName':        responseData = await updateGroupName.call(this, items); break;
			case 'getGroupData':           responseData = await getGroupData.call(this, items); break;
			case 'addGroupParticipant':    responseData = await addGroupParticipant.call(this, items); break;
			case 'removeGroupParticipant': responseData = await removeGroupParticipant.call(this, items); break;
			case 'setGroupAdmin':          responseData = await setGroupAdmin.call(this, items); break;
			case 'removeAdmin':            responseData = await removeAdmin.call(this, items); break;
			case 'leaveGroup':             responseData = await leaveGroup.call(this, items); break;

			// status
			case 'sendTextStatus':         responseData = await sendTextStatus.call(this, items); break;
			case 'sendVoiceStatus':        responseData = await sendVoiceStatus.call(this, items); break;
			case 'sendMediaStatus':        responseData = await sendMediaStatus.call(this, items); break;
			case 'deleteStatus':           responseData = await deleteStatus.call(this, items); break;
			case 'getStatusStatistic':     responseData = await getStatusStatistic.call(this, items); break;
			case 'getOutgoingStatuses':    responseData = await getOutgoingStatuses.call(this, items); break;
			case 'getIncomingStatuses':    responseData = await getIncomingStatuses.call(this, items); break;
		}

		return [this.helpers.returnJsonArray(responseData)];
	}
}