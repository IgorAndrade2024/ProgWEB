import axios from "axios";

export async function obterClima(cidade: string) {

    const resposta = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.OPENWEATHER_KEY}&units=metric&lang=pt_br`
    );

    return resposta.data;
}