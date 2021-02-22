import { Router } from "express";

import { MaterialsController } from "./materials.controller";

const router = Router();
const controller = new MaterialsController()

router.get('/', controller.getAll);

router.post('/', controller.create);

router.put('/', controller.update);

router.delete('/:id', controller.delete);

export default router