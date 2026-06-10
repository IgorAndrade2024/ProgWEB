import { useState } from "react";
import api from "../serviços/api";

interface Props {
    onSuccess: () => void;
}

function ContinenteForm({
    onSuccess
}: Props) {

    const [nome, setNome] = useState("");

    const [descricao, setDescricao] = useState("");

    async function salvar() {

        try {

            await api.post(
                "/continentes",
                {
                    nome,
                    descricao
                }
            );

            setNome("");
            setDescricao("");

            onSuccess();

        } catch (erro) {

            console.error(erro);

            alert(
                "Erro ao cadastrar continente"
            );
        }
    }

    return (

        <div>

            <h3>Novo Continente</h3>

            <input
                placeholder="Nome"
                value={nome}
                onChange={(e) =>
                    setNome(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                placeholder="Descrição"
                value={descricao}
                onChange={(e) =>
                    setDescricao(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={salvar}
            >
                Salvar
            </button>

        </div>
    );
}

export default ContinenteForm;