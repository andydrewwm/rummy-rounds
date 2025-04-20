import { Router } from "express"
import * as gameController from '../controllers/game'

const router = Router();

router.post('', gameController.create);

router.get('/:id', gameController.info);

export default router;
