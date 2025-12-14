import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';
import { TextMessageParams } from '../types/messages';

export async function sendText(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
) {
  return executePerItem<TextMessageParams>(
    this,
    items,
    (i) =>
      getParams<TextMessageParams>(this, i, {
        chatId: {},
        message: {},
        quotedMessageId: { default: '' },
        typingTime: { default: 0 },
      }),
    (params) =>
      greenApiRequest(this, 'sendMessage', {
        chatId: params.chatId,
        message: params.message,
        quotedMessageId: params.quotedMessageId,
        typingTime: params.typingTime,
      }),
  );
}
