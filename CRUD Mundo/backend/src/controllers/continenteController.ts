import { Request, Response } from "express";
import prisma from "../config/prisma";

export const criar = async (req: Request, res: Response) => {

    const continente = await prisma.continente.create({
        data: req.body
    });

    res.status(201).json(continente);
};

export const listar = async (req: Request, res: Response) => {

    const continentes = await prisma.continente.findMany();

    res.json(continentes);
};

export const buscar = async (req: Request, res: Response) => {

    const continente = await prisma.continente.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    res.json(continente);
};

export const atualizar = async (req: Request, res: Response) => {

    const continente = await prisma.continente.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    });

    res.json(continente);
};

export const excluir = async (req: Request, res: Response) => {

    await prisma.continente.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.sendStatus(204);
};