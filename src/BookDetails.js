import React from 'react'
import PropTypes from 'prop-types'

const BookDetails = (props) => (
    <div className='book-details-list'>
        <div key={props.book.id} className='book-details-list-item'>
            {props.book.imageLinks !== undefined && (
                    <div className="book-cover" style={{ width: 128, height: 193, 
                        backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}>
                    </div>

                )}
            <div className='book-details'>
                <p className="book-details-text">Title: {props.book.title}</p>
                <p className="book-details-text">Authors: {props.book.authors}</p>
                <p className="book-details-text">Categories: {props.book.categories}</p>
                <p className="book-details-text">Description: {props.book.description}</p>
                <p className="book-details-text">Page Count: {props.book.pageCount}</p>
                <p className="book-details-text">Published Date: {props.book.publishedDate}</p>
            </div>
        </div>
    </div>
)

BookDetails.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookDetails