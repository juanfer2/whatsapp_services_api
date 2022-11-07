import { Inject, Service } from 'typedi';
import { WhatsappService } from '../domain';

@Service('GetUserUseCase')
export class GetUserUseCase {
  constructor(@Inject('WhatsappService') private readonly whastappService: WhatsappService) {}

  async getInfo() {
    const user = await this.whastappService.getUser();
    console.log(user);
    return user;
  }
}
