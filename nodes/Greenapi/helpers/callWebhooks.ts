export const CALL_WEBHOOK_TYPES = ['incomingCall', 'outgoingCall'];

const CALL_WEBHOOK_SETTINGS: Record<string, string> = {
	incomingCall: 'incomingCallWebhook',
	outgoingCall: 'outgoingCallWebhook',
};

export function callWebhookSettings(chosenTypes: string[]): Record<string, string> {
	const settings: Record<string, string> = {};

	for (const type of chosenTypes) {
		if (CALL_WEBHOOK_SETTINGS[type]) {
			settings[CALL_WEBHOOK_SETTINGS[type]] = 'yes';
		}
	}

	return settings;
}

export function webhookChatId(body: { typeWebhook?: string; from?: string; senderData?: { chatId?: string } }): string {
	return (CALL_WEBHOOK_TYPES.includes(body.typeWebhook ?? '') ? body.from : body.senderData?.chatId) ?? '';
}
