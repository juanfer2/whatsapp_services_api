import { Router } from 'express';
import 'reflect-metadata';
import Container from 'typedi';
import { CohortsController } from '../controllers';

const router = Router();
const cohortsController = Container.get<CohortsController>(CohortsController);

router.get('/cohorts', cohortsController.all);

export default router;
