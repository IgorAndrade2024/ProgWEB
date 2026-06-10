import axios from "axios";

export async function buscarCidade(nome: string) {

    const resposta = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(nome)}&format=json&limit=1`,
        {
            headers: {
                "User-Agent": "CRUD-Mundo"
            }
        }
    );

    if (!resposta.data.length) {
        throw new Error("Cidade não encontrada");
    }

    const cidade = resposta.data[0];

    return {
        latitude: Number(cidade.lat),
        longitude: Number(cidade.lon),
        populacao: 0
    };
}