import { journalOperations } from './journalOperations';
import { lastMessagesFields } from './fields/lastMessages';
import { getChatHistoryFields } from './fields/getChatHistory';
import { getMessageFields } from './fields/getMessage';

export const journalDescription = [
	...journalOperations,
	...lastMessagesFields,
	...getChatHistoryFields,
	...getMessageFields,
];