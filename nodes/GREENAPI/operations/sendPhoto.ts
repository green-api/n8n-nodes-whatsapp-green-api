import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';
import { sendFileByUrlParams } from '../types/sending';

export async function sendPhoto(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
) {
  return executePerItem<sendFileByUrlParams>(
    this,
    items,
    (i) =>
      getParams<sendFileByUrlParams>(this, i, {
        chatId: {},
        photo: {},
        caption: { default: '' },
        quotedMessageId: { default: '' },
        typingTime: { default: 0 },
      }),
    (params) =>
      greenApiRequest(this, 'POST', 'sendFileByUrl', {
        chatId: params.chatId,
        urlFile: params.photo,
        caption: params.caption,
        quotedMessageId: params.quotedMessageId,
        typingTime: params.typingTime,
      }),
  );
}
