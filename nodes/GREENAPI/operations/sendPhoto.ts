import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executePerItem } from '../helpers/executePerItem';
import { getParams } from '../helpers/getParams';
import { greenApiRequest } from '../helpers/request';
import { PhotoMessageParams } from '../types/messages';

export async function sendPhoto(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
) {
  return executePerItem<PhotoMessageParams>(
    this,
    items,
    (i) =>
      getParams<PhotoMessageParams>(this, i, {
        chatId: {},
        photo: {},
        caption: { default: '' },
        quotedMessageId: { default: '' },
        typingTime: { default: 0 },
      }),
    (params) =>
      greenApiRequest(this, 'sendFileByUrl', {
        chatId: params.chatId,
        urlFile: params.photo,
        caption: params.caption,
        quotedMessageId: params.quotedMessageId,
        typingTime: params.typingTime,
      }),
  );
}
