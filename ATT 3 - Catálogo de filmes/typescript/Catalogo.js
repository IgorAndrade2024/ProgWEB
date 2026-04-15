export class CatalogoFilmes {
    filmes = [];
    adicionarFilme(filme) {
        if (filme.avaliacao !== undefined) {
            if (filme.avaliacao < 0 || filme.avaliacao > 10) {
                console.log("Avaliação deve ser entre 0 e 10");
                return;
            }
        }
        this.filmes.push(filme);
    }
    listarFilmes() {
        return this.filmes;
    }
    buscarPorTitulo(titulo) {
        return this.filmes.find(f => f.titulo.toLowerCase() === titulo.toLowerCase());
    }
    buscarPorGenero(genero) {
        return this.filmes.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
    }
    removerFilme(titulo) {
        this.filmes = this.filmes.filter(f => f.titulo.toLowerCase() !== titulo.toLowerCase());
    }
}
