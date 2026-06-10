import { Request, Response } from "express";
import prisma from "../config/prisma";
import { buscarCidade } from "../services/cidadeService";

export const criar = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            nome,
            paisId
        } = req.body;

        const dadosCidade =
            await buscarCidade(nome);

        if (!dadosCidade) {

            return res.status(404).json({
                erro: "Cidade não encontrada"
            });
        }

        const cidade =
            await prisma.cidade.create({

                data: {

                    nome,

                    populacao:
                        dadosCidade.populacao,

                    latitude:
                        dadosCidade.latitude,

                    longitude:
                        dadosCidade.longitude,

                    paisId: Number(paisId)
                }
            });

        return res.status(201).json(
            cidade
        );

    } catch (erro) {

        console.error(erro);

        return res.status(500).json({
            erro:
                "Erro ao cadastrar cidade"
        });
    }
};

export const listar = async (
    req: Request,
    res: Response
) => {

    const cidades =
        await prisma.cidade.findMany({
            include: {
                pais: true
            }
        });

    res.json(cidades);
};

export const buscar = async (
    req: Request,
    res: Response
) => {

    const cidade =
        await prisma.cidade.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

    res.json(cidade);
};

export const atualizar = async (
    req: Request,
    res: Response
) => {

    const cidade =
        await prisma.cidade.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

    res.json(cidade);
};

export const excluir = async (
    req: Request,
    res: Response
) => {

    try {

        await prisma.cidade.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.sendStatus(204);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao excluir cidade"
        });
    }
};