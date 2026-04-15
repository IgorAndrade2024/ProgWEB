import { Filme } from "./Filme.js";

export class CatalogoFilmes {
    private filmes: Filme[] = [];
    adicionarFilme(filme: Filme): void {
        if (filme.avaliacao !== undefined) {
            if (filme.avaliacao < 0 || filme.avaliacao > 10) {
                console.log("Avaliação deve ser entre 0 e 10");
                return;
            }
        }
        this.filmes.push(filme);
    }
    listarFilmes(): Filme[] {
        return this.filmes;
    }
    buscarPorTitulo(titulo: string): Filme | undefined {
        return this.filmes.find(f =>
            f.titulo.toLowerCase() === titulo.toLowerCase()
        );
    }
    buscarPorGenero(genero: string): Filme[] {
        return this.filmes.filter(f =>
            f.genero.toLowerCase() === genero.toLowerCase()
        );
    }
    removerFilme(titulo: string): void {
        this.filmes = this.filmes.filter(f =>
            f.titulo.toLowerCase() !== titulo.toLowerCase()
        );
    }
}