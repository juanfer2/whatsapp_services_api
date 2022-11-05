import { Inject, Service } from 'typedi';
import { WhatsappMessageRepository } from '../domain';
import { TYPES } from '../types';

@Service('AllMessagesUseCase')
export class AllMessagesUseCase {
  constructor(
    @Inject('WhatsappMessageRepository') private readonly whastappMessageRespository: WhatsappMessageRepository
  ) {}

  async getAllMessages() {
    return await this.whastappMessageRespository.all();
  }
}
