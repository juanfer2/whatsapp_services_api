import { Router } from 'express';
import 'reflect-metadata';
import Container from 'typedi';
import { WhatsappController } from '../controllers/whatsapp_controller';

const router = Router();
const whatsappController = Container.get<WhatsappController>(WhatsappController);

router.get('/whatsapp/info', whatsappController.getInfo);
router.post('/whatsapp/send', whatsappController.sendMessage);
router.post('/whatsapp/send_multiples', whatsappController.sendMultipleMessages);
router.get('/whatsapp/messages', whatsappController.allMessages);
router.get('/whatsapp/flow_conversation', whatsappController.flowConversation);

export default router;
