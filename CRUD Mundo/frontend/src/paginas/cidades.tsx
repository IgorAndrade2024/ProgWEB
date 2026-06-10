import { useEffect, useState } from "react";
import api from "../serviços/api";
import CidadeForm from "../componentes/cidadeForm";

function Cidades() {

    const [cidades, setCidades] = useState<any[]>([]);

    async function carregar() {

        try {

            const resposta = await api.get(
                "/cidades"
            );

            setCidades(
                resposta.data
            );

        } catch (erro) {

            console.error(erro);
        }
    }

    async function excluir(id: number) {

        try {

            await api.delete(
                `/cidades/${id}`
            );

            carregar();

        } catch (erro) {

            console.error(erro);

            alert(
                "Erro ao excluir cidade"
            );
        }
    }

    useEffect(() => {

        carregar();

    }, []);

    return (

        <div>

            <h1>Cidades</h1>

            <CidadeForm
                onSuccess={carregar}
            />

            <hr />

            {cidades.length === 0 ? (

                <p>
                    Nenhuma cidade cadastrada
                </p>

            ) : (

                cidades.map((cidade) => (

                    <div
                        key={cidade.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px"
                        }}
                    >

                        <h3>
                            {cidade.nome}
                        </h3>

                        <p>
                            Latitude:
                            {" "}
                            {cidade.latitude}
                        </p>

                        <p>
                            Longitude:
                            {" "}
                            {cidade.longitude}
                        </p>

                        {cidade.pais && (

                            <p>
                                País:
                                {" "}
                                {cidade.pais.nome}
                            </p>

                        )}

                        <button
                            onClick={() =>
                                excluir(
                                    cidade.id
                                )
                            }
                        >
                            Excluir
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default Cidades;