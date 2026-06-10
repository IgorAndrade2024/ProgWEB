import { Request, Response } from "express";
import prisma from "../config/prisma";
import { buscarPais } from "../services/restCountries";

export const criar = async (req: Request, res: Response) => {

    try {

        const {
            nome,
            continenteId
        } = req.body;

        const dados = await buscarPais(nome);

        if (!dados) {
            return res.status(404).json({
                erro: "País não encontrado"
            });
        }

        const idioma = dados.languages
            ? Object.values(dados.languages)[0] as string
            : "Não informado";

        const moeda = dados.currencies
            ? Object.keys(dados.currencies)[0]
            : "Não informada";

        const pais = await prisma.pais.create({

            data: {

                nome: dados.translations?.por?.common || dados.name.common,

                populacao: dados.population || 0,

                idiomaOficial: idioma,

                moeda: moeda,

                continenteId: Number(continenteId)
            }
        });

        return res.status(201).json(pais);

    } catch (error) {

        console.error("ERRO AO CADASTRAR PAÍS:", error);

        return res.status(500).json({
            erro: "Não foi possível cadastrar o país"
        });
    }
};

export const listar = async (req: Request, res: Response) => {

    const paises = await prisma.pais.findMany({
        include: {
            continente: true
        }
    });

    res.json(paises);
};

export const buscar = async (req: Request, res: Response) => {

    const pais = await prisma.pais.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    res.json(pais);
};

export const atualizar = async (req: Request, res: Response) => {

    const pais = await prisma.pais.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    });

    res.json(pais);
};

export const excluir = async (
    req: Request,
    res: Response
) => {

    const id = Number(req.params.id);

    await prisma.cidade.deleteMany({
        where: {
            paisId: id
        }
    });

    await prisma.pais.delete({
        where: {
            id
        }
    });

    res.sendStatus(204);
};