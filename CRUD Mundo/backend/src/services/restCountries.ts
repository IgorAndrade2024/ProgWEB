import axios from "axios";

export async function buscarPais(nome: string) {

    try {

        const resposta = await axios.get(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(nome)}`
        );

        return resposta.data[0];

    } catch {

        return null;
    }
}