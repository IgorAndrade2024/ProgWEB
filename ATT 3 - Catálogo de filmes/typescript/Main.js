import { CatalogoFilmes } from "./Catalogo.js";
const catalogo = new CatalogoFilmes();
const lista = document.getElementById("lista");
console.log("🚀 JS CARREGOU");
// Renderizar filmes
function renderizar(filmes) {
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
    const filme = {
        titulo: document.getElementById("titulo").value,
        ano: Number(document.getElementById("ano").value),
        genero: document.getElementById("genero").value,
        duracao: Number(document.getElementById("duracao").value),
        avaliacao: Number(document.getElementById("avaliacao").value)
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
    const titulo = document.getElementById("buscaTitulo").value;
    const resultado = catalogo.buscarPorTitulo(titulo);
    if (resultado)
        renderizar([resultado]);
    else
        alert("Filme não encontrado");
});
// Buscar por gênero
document.getElementById("btnBuscarGenero")?.addEventListener("click", () => {
    const genero = document.getElementById("buscaGenero").value;
    const resultados = catalogo.buscarPorGenero(genero);
    if (resultados.length > 0)
        renderizar(resultados);
    else
        alert("Nenhum filme encontrado");
});
