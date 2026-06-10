import { useEffect, useState } from "react";
import api from "../serviços/api";
import ContinenteForm from "../componentes/continenteForm";

function Continentes() {

    const [continentes, setContinentes] = useState<any[]>([]);

    async function carregar() {

        try {

            const resposta = await api.get(
                "/continentes"
            );

            setContinentes(
                resposta.data
            );

        } catch (erro) {

            console.error(erro);
        }
    }

    async function excluir(id: number) {

        try {

            await api.delete(
                `/continentes/${id}`
            );

            await carregar();

        } catch (erro) {

            console.error(erro);
        }
    }

    useEffect(() => {

        carregar();

    }, []);

    return (

        <div>

            <h1>Continentes</h1>

            <ContinenteForm
                onSuccess={carregar}
            />

            <hr />

            {continentes.map(
                (continente) => (

                    <div
                        key={continente.id}
                    >

                        <h3>
                            {continente.nome}
                        </h3>

                        <p>
                            {continente.descricao}
                        </p>

                        <button
                            onClick={() =>
                                excluir(
                                    continente.id
                                )
                            }
                        >
                            Excluir
                        </button>

                    </div>
                )
            )}

        </div>
    );
}

export default Continentes;