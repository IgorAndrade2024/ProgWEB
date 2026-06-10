import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

    const [logado, setLogado] =
        useState(false);

    useEffect(() => {

        const token =
            localStorage.getItem(
                "token"
            );

        setLogado(!!token);

    }, []);

    if (!logado) {
        return null;
    }

    return (

        <nav>

            <Link to="/continentes">
                Continentes
            </Link>

            {" | "}

            <Link to="/paises">
                Países
            </Link>

            {" | "}

            <Link to="/cidades">
                Cidades
            </Link>

            {" | "}

            <button
                onClick={() => {

                    localStorage.removeItem(
                        "token"
                    );

                    window.location.href = "/";
                }}
            >
                Sair
            </button>

        </nav>
    );
}

export default Navbar;