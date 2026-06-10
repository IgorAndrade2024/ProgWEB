import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../serviços/api";

function Login() {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    async function fazerLogin(e: React.FormEvent) {

        e.preventDefault();

        try {

            const resposta = await api.post(
                "/auth/login",
                {
                    usuario,
                    senha
                }
            );

            localStorage.setItem(
                "token",
                resposta.data.token
            );

            window.location.href = "/continentes";

        } catch {

            alert("Usuário ou senha inválidos");
        }
    }

    return (

        <div className="container">

            <h1>Login</h1>

            <form onSubmit={fazerLogin}>

                <input
                    value={usuario}
                    onChange={(e) =>
                        setUsuario(e.target.value)
                    }
                    placeholder="Usuário"
                />

                <br />
                <br />

                <input
                    type="password"
                    value={senha}
                    onChange={(e) =>
                        setSenha(e.target.value)
                    }
                    placeholder="Senha"
                />

                <br />
                <br />

                <button type="submit">
                    Entrar
                </button>

            </form>

        </div>
    );
}

export default Login;