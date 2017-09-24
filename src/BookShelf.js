import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onAlterarEstadoLivro: PropTypes.func.isRequired,
        onSubmitDetaisBook:  PropTypes.func.isRequired
    }

    render() {
        const { books } = this.props
        const { title } = this.props
        const { onAlterarEstadoLivro } = this.props
        const { onSubmitDetaisBook } = this.props
        
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {books.map((book) => (
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
    )
  }
}

export default BookShelf
