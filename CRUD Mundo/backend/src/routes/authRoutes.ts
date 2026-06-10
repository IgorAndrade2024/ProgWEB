import { Router } from "express";
import { gerarToken } from "../middleware/auth";

const router = Router();

router.post("/login", (req, res) => {

    console.log("BODY:", req.body);

    const { usuario, senha } = req.body;

    if (usuario === "admin" && senha === "123") {

        return res.json({
            token: gerarToken()
        });
    }

    return res.status(401).json({
        erro: "Credenciais inválidas"
    });
});

export default router;