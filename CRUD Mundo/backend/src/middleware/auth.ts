import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function gerarToken() {

    return jwt.sign(
        {
            usuario: "admin"
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1d"
        }
    );
}

export function autenticar(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            erro: "Token não informado"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        next();

    } catch {

        return res.status(401).json({
            erro: "Token inválido"
        });
    }
}