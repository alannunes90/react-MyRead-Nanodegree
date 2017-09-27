import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

const BookShelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
            {props.books.map((book) => (
                <Book 
                    key={book.id} 
                    book={book}
                    onUpdateBookShelf={props.onUpdateBookShelf}
                    shelf={book.shelf}
                    onSubmitDetaisBook={props.onSubmitDetaisBook}
                />
            ))}
            </ol>
        </div>
    </div>
)

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
    onSubmitDetaisBook:  PropTypes.func.isRequired
};

export default BookShelf
