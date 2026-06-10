import { useEffect, useState } from "react";
import api from "../serviços/api";

interface Props {
    onSuccess: () => void;
}

function PaisForm({ onSuccess }: Props) {

    const [nome, setNome] = useState("");
    const [continenteId, setContinenteId] = useState("");
    const [continentes, setContinentes] = useState<any[]>([]);

    async function carregarContinentes() {

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

    async function salvar() {

        try {

            await api.post(
                "/paises",
                {
                    nome,
                    continenteId: Number(
                        continenteId
                    )
                }
            );

            setNome("");
            setContinenteId("");

            onSuccess();

        } catch (erro) {

            console.error(erro);

            alert(
                "Erro ao cadastrar país"
            );
        }
    }

    useEffect(() => {

        carregarContinentes();

    }, []);

    return (

        <div>

            <h3>Novo País</h3>

            <input
                placeholder="Nome do País"
                value={nome}
                onChange={(e) =>
                    setNome(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <select
                value={continenteId}
                onChange={(e) =>
                    setContinenteId(
                        e.target.value
                    )
                }
            >

                <option value="">
                    Selecione um continente
                </option>

                {continentes.map((c) => (

                    <option
                        key={c.id}
                        value={c.id}
                    >
                        {c.nome}
                    </option>

                ))}

            </select>

            <br />
            <br />

            <button
                onClick={salvar}
            >
                Buscar e Salvar
            </button>

        </div>
    );
}

export default PaisForm;