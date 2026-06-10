import { Router } from "express";

import {
    criar,
    listar,
    buscar,
    atualizar,
    excluir
} from "../controllers/paisController";

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", buscar);
router.put("/:id", atualizar);
router.delete("/:id", excluir);

export default router;