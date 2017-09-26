import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Search from './Search.js';
import ListBooks from './ListBooks.js';
import BookDetails from './BookDetails.js';
var debounce = require('lodash.debounce');

class BooksApp extends Component {
  state = {
    books: [],
    booksSearch: []
  }
  
  componentDidMount() {
    this.getBooks();
  }

  /**
  * @description Chama modal para obter os detalhes do livro
  * @param {string} bookId - O identificador do livro
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
  }

  /**
  * @description Pesquisa livros
  * @param {string} query - O valor a ser buscado
  */
  searchLivros = (query) => {
    console.dir('passou');
    if(query){

      BooksAPI.search(query).then((livros) => {
        
        if (livros.error === 'empty query')
        {
          this.setState({ booksSearch:[] })
        }
        else 
        {
          // Buscar todos os identificadores dos livros
          const idBooks = new Set(livros.map(l => l.id));

          // Buscar o identificadores dos livros que estão na prateleira
          const idBooksShelf = new Set(this.state.books.map(l => l.id));

          // Remover os livros que já estão nas prateleiras e receber identificador do livro
          let idBooksNoShelf = new Set(
              [...idBooks].filter(x => !idBooksShelf.has(x)));
          
          // Buscar o objeto Livro, através do identificadores dos livros que não estão na prateleira
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
    
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState((state) => ({
        booksSearch: state.booksSearch.filter(b => b.id !== book.id),
        books: state.books.filter(b => b.id !== book.id).concat(book).filter(b => b.shelf !== 'none')
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My reads</h1>
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
            onSearchLivros={debounce(this.searchLivros,1000)}
            onAlterarEstadoLivro={this.alterarEstadoLivro}
            onSubmitDetaisBook={this.submitDetaisBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp