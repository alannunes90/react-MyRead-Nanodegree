import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import Book from './Book.js'
import BookShelf from './BookShelf.js';

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
            <BookShelf 
                title={'Currently Reading'}
                books={books.filter(l => l.shelf === 'currentlyReading')} 
                onAlterarEstadoLivro={onAlterarEstadoLivro} 
                onSubmitDetaisBook={onSubmitDetaisBook} 
            />
            <BookShelf 
                title={'Want to Read'}
                books={books.filter(l => l.shelf === 'wantToRead')} 
                onAlterarEstadoLivro={onAlterarEstadoLivro} 
                onSubmitDetaisBook={onSubmitDetaisBook} 
            />
            <BookShelf 
                title={'read'}
                books={books.filter(l => l.shelf === 'read')} 
                onAlterarEstadoLivro={onAlterarEstadoLivro} 
                onSubmitDetaisBook={onSubmitDetaisBook} 
            />
        </div>
    )
  }
}

export default ListBooks
