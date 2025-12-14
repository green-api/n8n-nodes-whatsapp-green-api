export interface BaseMessageParams {
  chatId: string;
  quotedMessageId?: string;
  typingTime?: number;
}

export interface TextMessageParams extends BaseMessageParams {
  message: string;
}

export interface PhotoMessageParams extends BaseMessageParams {
  photo: string;
  caption?: string;
}
