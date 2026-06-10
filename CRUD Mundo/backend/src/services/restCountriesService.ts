import axios from "axios";

export async function obterPais(nome: string) {

    const resposta = await axios.get(
        `https://restcountries.com/v3.1/name/${nome}`
    );

    return resposta.data[0];
}