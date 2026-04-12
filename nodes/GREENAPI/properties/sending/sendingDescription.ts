import { sendingOperations } from './sendingOperations';
import { sharedFields } from './fields/shared';
import { sendMessageFields } from './fields/sendMessage';
import { sendFileByUrlFields } from './fields/sendFileByUrl';
import { sendContactFields } from './fields/sendContact';
import { sendLocationFields } from './fields/sendLocation';
import { sendPollFields } from './fields/sendPoll';
import { forwardMessagesFields } from './fields/forwardMessages';
import { sendInteractiveButtonsFields } from './fields/sendInteractiveButtons';
import { sendInteractiveButtonsReplyFields } from './fields/sendInteractiveButtonsReply';

export const sendingDescription = [
	...sendingOperations,
	...sharedFields,
	...sendMessageFields,
	...sendFileByUrlFields,
	...sendContactFields,
	...sendLocationFields,
	...sendPollFields,
	...forwardMessagesFields,
	...sendInteractiveButtonsFields,
	...sendInteractiveButtonsReplyFields,
];