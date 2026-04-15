import { CatalogoFilmes } from "./Catalogo.js";
import { Filme } from "./Filme.js";

const catalogo = new CatalogoFilmes();
const lista = document.getElementById("lista") as HTMLUListElement;
console.log("🚀 JS CARREGOU");
// Renderizar filmes
function renderizar(filmes: Filme[]): void {
    lista.innerHTML = "";

    filmes.forEach(f => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${f.titulo}</strong> (${f.ano})<br>
            ${f.genero} • ${f.duracao} min<br>
            ⭐ ${f.avaliacao ?? "N/A"}
            <br><button data-titulo="${f.titulo}">Remover</button>
        `;

        // botão remover
        li.querySelector("button")?.addEventListener("click", () => {
            catalogo.removerFilme(f.titulo);
            renderizar(catalogo.listarFilmes());
        });

        lista.appendChild(li);
    });
}

// Adicionar filme
document.getElementById("btnAdicionar")?.addEventListener("click", () => {
    const filme: Filme = {
        titulo: (document.getElementById("titulo") as HTMLInputElement).value,
        ano: Number((document.getElementById("ano") as HTMLInputElement).value),
        genero: (document.getElementById("genero") as HTMLInputElement).value,
        duracao: Number((document.getElementById("duracao") as HTMLInputElement).value),
        avaliacao: Number((document.getElementById("avaliacao") as HTMLInputElement).value)
    };

    catalogo.adicionarFilme(filme);
    renderizar(catalogo.listarFilmes());
});

// Listar todos
document.getElementById("btnListar")?.addEventListener("click", () => {
    renderizar(catalogo.listarFilmes());
});

// Buscar por título
document.getElementById("btnBuscarTitulo")?.addEventListener("click", () => {
    const titulo = (document.getElementById("buscaTitulo") as HTMLInputElement).value;
    const resultado = catalogo.buscarPorTitulo(titulo);

    if (resultado) renderizar([resultado]);
    else alert("Filme não encontrado");
});

// Buscar por gênero
document.getElementById("btnBuscarGenero")?.addEventListener("click", () => {
    const genero = (document.getElementById("buscaGenero") as HTMLInputElement).value;
    const resultados = catalogo.buscarPorGenero(genero);

    if (resultados.length > 0) renderizar(resultados);
    else alert("Nenhum filme encontrado");
});