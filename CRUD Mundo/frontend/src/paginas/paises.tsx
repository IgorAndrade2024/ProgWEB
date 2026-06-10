import { useEffect, useState } from "react";
import api from "../serviços/api";
import PaisForm from "../componentes/paisForm";

function Paises() {

    const [paises, setPaises] = useState<any[]>([]);

    async function carregar() {

        const resposta = await api.get("/paises");

        setPaises(resposta.data);
    }

    async function excluir(id: number) {

        await api.delete(`/paises/${id}`);

        carregar();
    }

    useEffect(() => {
        carregar();
    }, []);

    return (

        <div className="container-custom">

            <h1 className="titulo">
                🌎 Cadastro de Países
            </h1>

            <div className="card-custom">
                <PaisForm onSuccess={carregar}/>
            </div>

            <div className="card-custom">

                <h3>Países cadastrados</h3>

                {paises.map((pais) => (

                    <div
                        key={pais.id}
                        className="lista-item"
                    >

                        <h4>{pais.nome}</h4>

                        <p>
                            <strong>Idioma:</strong>
                            {" "}
                            {pais.idiomaOficial}
                        </p>

                        <p>
                            <strong>Moeda:</strong>
                            {" "}
                            {pais.moeda}
                        </p>

                        <p>
                            <strong>População:</strong>
                            {" "}
                            {pais.populacao.toLocaleString()}
                        </p>

                        <button
                            className="btn btn-danger"
                            onClick={() => excluir(pais.id)}
                        >
                            Excluir
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Paises;