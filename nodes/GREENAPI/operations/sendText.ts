import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';
import { sendMessageParams } from '../types/sending';

export async function sendText(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
) {
  return executePerItem<sendMessageParams>(
    this,
    items,
    (i) =>
      getParams<sendMessageParams>(this, i, {
        chatId: {},
        message: {},
        quotedMessageId: { default: '' },
        typingTime: { default: 0 },
      }),
    (params) =>
      greenApiRequest(this, 'POST', 'sendMessage', {
        chatId: params.chatId,
        message: params.message,
        quotedMessageId: params.quotedMessageId,
        typingTime: params.typingTime,
      }),
  );
}
