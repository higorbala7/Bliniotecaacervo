class Livro {
    constructor(titulo, autor, ano, genero) {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.genero = genero;
    }
}

class Biblioteca {
    constructor() {
        this.livros = this.carregarLivros();
        this.atualizarListaDeLivros(); // Atualiza a lista ao iniciar
    }

    adicionarLivro(livro) {
        this.livros.push(livro);
        this.salvarLivros();
        this.atualizarListaDeLivros();
    }

    removerLivro(indice) {
        this.livros.splice(indice, 1);
        this.salvarLivros();
        this.atualizarListaDeLivros();
    }

    atualizarListaDeLivros() {
        const lista = document.getElementById('book-list');
        lista.innerHTML = '';

        this.livros.forEach((livro, index) => {
            const item = document.createElement('li');
            item.innerHTML = `
                ${livro.titulo} - ${livro.autor} (${livro.ano}) [${livro.genero}]
                <button onclick="biblioteca.removerLivro(${index})">Remover</button>
            `;
            lista.appendChild(item);
        });
    }

    salvarLivros() {
        localStorage.setItem('livros', JSON.stringify(this.livros));
    }

    carregarLivros() {
        const livrosSalvos = localStorage.getItem('livros');
        return livrosSalvos ? JSON.parse(livrosSalvos) : [];
    }
}

// Instanciando a biblioteca
const biblioteca = new Biblioteca();

document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('title').value;
    const autor = document.getElementById('author').value;
    const ano = document.getElementById('year').value;
    const genero = document.getElementById('genre').value;

    const livro = new Livro(titulo, autor, ano, genero);
    biblioteca.adicionarLivro(livro);

    limparCampos();
});

function limparCampos() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('genre').value = '';
}
