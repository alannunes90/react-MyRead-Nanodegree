import React from 'react'
import PropTypes from 'prop-types'

class DetailsBook extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }
    render() {
        const { book } = this.props
    return (
        <div>
            <div className='book-details-list'>
                <div key={book.id} className='book-details-list-item'>
                    {book.imageLinks !== undefined && (
                            <div className="book-cover" style={{ width: 128, height: 193, 
                                backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                            </div>

                        )}
                    <div className='book-details'>
                        <p className="book-details-text">Title: {book.title}</p>
                        <p className="book-details-text">Authors: {book.authors}</p>
                        <p className="book-details-text">Categories: {book.categories}</p>
                        <p className="book-details-text">Description: {book.description}</p>
                        <p className="book-details-text">Page Count: {book.pageCount}</p>
                        <p className="book-details-text">Published Date: {book.publishedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default DetailsBook