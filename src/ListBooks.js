import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onAlterarEstadoLivro: PropTypes.func.isRequired,
        onSubmitDetaisBook:  PropTypes.func.isRequired
    }

    render() {
        const { books } = this.props
        const { onAlterarEstadoLivro } = this.props
        const { onSubmitDetaisBook } = this.props
        
    return (
        <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(l => l.shelf === 'currentlyReading').map((book) => (
                        <Book 
                            key={book.id} 
                            book={book}
                            onAlterarEstadoLivro={onAlterarEstadoLivro}
                            shelf={book.shelf}
                            onSubmitDetaisBook={onSubmitDetaisBook}
                         />
                    ))}
                </ol>
            </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(l => l.shelf === 'wantToRead').map((book) => (
                        <Book 
                            key={book.id} 
                            book={book}
                            onAlterarEstadoLivro={onAlterarEstadoLivro}
                            shelf={book.shelf}
                            onSubmitDetaisBook={onSubmitDetaisBook}
                         />
                    ))}
                </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(l => l.shelf === 'read').map((book) => (
                        <Book 
                            key={book.id} 
                            book={book}
                            onAlterarEstadoLivro={onAlterarEstadoLivro}
                            shelf={book.shelf}
                            onSubmitDetaisBook={onSubmitDetaisBook}
                         />
                    ))}
                </ol>
                </div>
            </div>
        </div>
    )
  }
}

export default ListBooks
