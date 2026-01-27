export interface BaseParams {
  chatId: string;
  quotedMessageId?: string;
  typingTime?: number;
}

export interface sendMessageParams extends BaseParams {
  message: string;
}

export interface sendFileByUrlParams extends BaseParams {
  photo: string;
  caption?: string;
}

export interface sendPollParams extends BaseParams {
  message: string;
  options: { option?: { optionName: string }[]; };
  multipleAnswers: boolean;
}