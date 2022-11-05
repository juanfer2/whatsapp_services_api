import { Router } from "express";
import { SendMessageUseCase } from "../../application/send_message_use_case";
import { whatsappController } from '../controllers/whatsapp_controller'
import { WPService } from "../repositories/whatsapp_service";

const router = Router();

const whastappService = new WPService();
const sendMessageUseCase = new SendMessageUseCase(whastappService)
const whatsapp = new whatsappController(sendMessageUseCase);

router.post('/whatsapp/send', whatsapp.sendMessage)

export default router;
