import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Search from './Search.js';
import ListBooks from './ListBooks.js';
import BookDetails from './BookDetails.js';


class BooksApp extends Component {
  state = {
    books: [],
    booksSearch: []
  }
  
  componentDidMount() {
    this.getBooks();
  }

  /**
  * @description Altera o localStorage
  * @param {string} local - O localStorage que deve ser usado para guardar as informações
  * @param {array} livros - O(s) livro(s) que armazenaremos no localStorage
  */
  updateLocalStorage(local, livros) {
    window.localStorage.setItem(local, JSON.stringify(livros));
  }

  /**
  * @description Limpa todos os localStorage
  */
  clearLocalStorage() {
    window.localStorage.removeItem('localStorageBooks');
  }

  /**
  * @description Chama modal para obter os detalhes do livro
  */
  submitDetaisBook = (bookId) => {
    
    const bookDetails = this.state.books.filter(l => l.id === bookId)[0];

    confirmAlert({
      title: 'My reads',                        // Title dialog 
      message: 'Want to read this book?',               // Message dialog 
      childrenElement: () => <BookDetails book={bookDetails} />,       // Custom UI or Component 
      confirmLabel: 'Yes',                           // Text button confirm 
      cancelLabel: 'Cancel',                             // Text button cancel 
      onConfirm: () => this.alterarEstadoLivro(bookDetails, 'wantToRead'),    // Action after Confirm 
    })
  };

  /**
  * @description Busca livros das 3 prateleiras na API
  */
  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
    //TODO: Se tiver offline, usar o localStorage
    // books: JSON.parse(window.localStorage.getItem('localStorageBooks'))
  }

  /**
  * @description Pesquisa livros
  * @param {string} query - O valor a ser buscado
  */
  searchLivros = (query) => {
    if(query){
      BooksAPI.search(query).then((livros) => {
        
        //TODO: 
        // Reference: http://2ality.com/2015/01/es6-set-operations.html
        if (livros.error === 'empty query')
        {
          this.setState({ booksSearch:[] })
        }
        else 
        {
          //TODO: Buscar todos os identificadores dos livros
          const idBooks = new Set(livros.map(l => l.id));

          //TODO: Buscar o identificadores dos livros que estão na prateleira
          const idBooksShelf = new Set(this.state.books.map(l => l.id));

          //TODO: Remover os livros que já estão nas prateleiras e receber identificador do livro
          let idBooksNoShelf = new Set(
              [...idBooks].filter(x => !idBooksShelf.has(x)));
          
          //TODO: Buscar o objeto Livro, através do identificadores dos livros que não estão na prateleira
          const booksSearch = livros.filter( function(n) {return this.has(n.id)}, idBooksNoShelf);

          this.setState({ booksSearch })
        }
      
      })
    }
    else 
      this.setState({ booksSearch:[] })
  }

  /**
  * @description Inclui um livro em uma determinada prateleira
  * @param {object} book - Objeto livro
  * @param {string} shelf - A prateleira que o livro será alocado
  */
  alterarEstadoLivro = (book, shelf) => {
    
    BooksAPI.update(book, shelf);

    // TODO: Remove da prateleira atual
    this.setState((state) => ({
      books: state.books.filter(l => l.id !== book.id)
    }))

    // TODO: Remove do search
    this.setState((state) => ({
      booksSearch: state.booksSearch.filter(l => l.id !== book.id)
    }))

    // TODO: Incluir o livro na sua nova prateleira, caso não tenha sido removido "none"
    if (shelf !== 'none')
    {
      book.shelf = shelf;
      this.setState((state) => ({
        books: state.books.concat([book])
      }))
    }

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Minhas leituras</h1>
            </div>
            <ListBooks
              books={this.state.books}
              onAlterarEstadoLivro={this.alterarEstadoLivro}
              onSubmitDetaisBook={this.submitDetaisBook}
            />
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <Search 
            books={this.state.booksSearch}
            onSearchLivros={this.searchLivros}
            onAlterarEstadoLivro={this.alterarEstadoLivro}
            onSubmitDetaisBook={this.submitDetaisBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
