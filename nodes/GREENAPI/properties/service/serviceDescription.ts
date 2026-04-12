import { serviceOperations } from './serviceOperations';
import { sharedFields } from './fields/shared';
import { readChatFields } from './fields/readChat';
import { deleteMessageFields } from './fields/deleteMessage';
import { editMessageFields } from './fields/editMessage';
import { checkWhatsappFields } from './fields/checkWhatsapp';
import { setDisappearingChatFields } from './fields/setDisappearingChat';

export const serviceDescription = [
	...serviceOperations,
	...sharedFields,
	...readChatFields,
	...deleteMessageFields,
	...editMessageFields,
	...checkWhatsappFields,
	...setDisappearingChatFields,
];