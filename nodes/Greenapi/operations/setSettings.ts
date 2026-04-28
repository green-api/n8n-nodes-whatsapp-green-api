import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { greenApiRequest } from '../helpers/request';

const SETTINGS_KEYS = [
	'settings.webhookUrl',
	'settings.webhookUrlToken',
	'settings.delaySendMessagesMilliseconds',
	'settings.markIncomingMessagesReaded',
	'settings.markIncomingMessagesReadedOnReply',
	'settings.outgoingWebhook',
	'settings.outgoingMessageWebhook',
	'settings.outgoingAPIMessageWebhook',
	'settings.stateWebhook',
	'settings.incomingWebhook',
	'settings.keepOnlineStatus',
	'settings.pollMessageWebhook',
	'settings.incomingCallWebhook',
	'settings.editedMessageWebhook',
	'settings.deletedMessageWebhook',
];

export async function setSettings(this: IExecuteFunctions, items: INodeExecutionData[]) {
	return executePerItem(this, items,
		(i) => {
			const body: Record<string, unknown> = {};
			for (const key of SETTINGS_KEYS) {
				const value = this.getNodeParameter(key, i, null);
				if (value !== undefined && value !== null) {
					const cleanKey = key.replace(/^settings\./, '');
					body[cleanKey] = typeof value === 'boolean' ? (value ? 'yes' : 'no') : value;
				}
			}
			return { body };
		},
		(p) => greenApiRequest(this, 'POST', 'setSettings', p.body),
	);
}