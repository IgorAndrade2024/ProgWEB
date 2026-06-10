import {
    useEffect,
    useState
} from "react";

import api from "../serviços/api";

interface Props {
    onSuccess: () => void;
}

function CidadeForm({
    onSuccess
}: Props) {

    const [nome, setNome] =
        useState("");

    const [paisId, setPaisId] =
        useState("");

    const [paises, setPaises] =
        useState<any[]>([]);

    async function carregarPaises() {

        const resposta =
            await api.get("/paises");

        setPaises(
            resposta.data
        );
    }

    async function salvar() {

        try {

            await api.post(
                "/cidades",
                {
                    nome,
                    paisId: Number(
                        paisId
                    )
                }
            );

            setNome("");
            setPaisId("");

            onSuccess();

        } catch {

            alert(
                "Erro ao cadastrar cidade"
            );
        }
    }

    useEffect(() => {

        carregarPaises();

    }, []);

    return (

        <div>

            <h3>Nova Cidade</h3>

            <input
                placeholder="Nome da Cidade"
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
                value={paisId}
                onChange={(e) =>
                    setPaisId(
                        e.target.value
                    )
                }
            >

                <option value="">
                    Selecione um País
                </option>

                {paises.map((p) => (

                    <option
                        key={p.id}
                        value={p.id}
                    >
                        {p.nome}
                    </option>

                ))}

            </select>

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

export default CidadeForm;