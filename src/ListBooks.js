import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import Book from './Book.js'
import BookShelf from './BookShelf.js';

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBookShelf: PropTypes.func.isRequired,
        onSubmitDetaisBook:  PropTypes.func.isRequired
    }

    render() {
        const { books, 
                onUpdateBookShelf,
                onSubmitDetaisBook } = this.props
        
    return (
        <div className="list-books-content">
            <BookShelf 
                title={'Currently Reading'}
                books={books.filter(l => l.shelf === 'currentlyReading')} 
                onUpdateBookShelf={onUpdateBookShelf} 
                onSubmitDetaisBook={onSubmitDetaisBook} 
            />
            <BookShelf 
                title={'Want to Read'}
                books={books.filter(l => l.shelf === 'wantToRead')} 
                onUpdateBookShelf={onUpdateBookShelf} 
                onSubmitDetaisBook={onSubmitDetaisBook} 
            />
            <BookShelf 
                title={'read'}
                books={books.filter(l => l.shelf === 'read')} 
                onUpdateBookShelf={onUpdateBookShelf} 
                onSubmitDetaisBook={onSubmitDetaisBook} 
            />
        </div>
    )
  }
}

export default ListBooks
