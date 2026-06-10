import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    await prisma.continente.createMany({
        data: [
            {
                nome: "América",
                descricao: "Continente americano"
            },
            {
                nome: "Europa",
                descricao: "Continente europeu"
            },
            {
                nome: "Ásia",
                descricao: "Continente asiático"
            }
        ]
    });

    console.log("Seed executado");
}

main();