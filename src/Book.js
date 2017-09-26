import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onAlterarEstadoLivro: PropTypes.func.isRequired,
        onSubmitDetaisBook:  PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired
    }

    changeCombo = (event) => {
        this.props.onAlterarEstadoLivro(this.props.book, event.target.value)
    }

    render() {
        const { book } = this.props
        const { shelf } = this.props
        
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    
                    <a type="submit" onClick={() => { this.props.onSubmitDetaisBook(book.id) }}>
                        {/*TODO: Se existir imagem exibe, caso contrário não exibir */}
                        {book.imageLinks !== undefined ? (
                            <div className="book-cover" style={{ width: 128, height: 193, 
                                backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                            </div>
                            
                        ) : (
                                <div className="book-cover" style={{ width: 128, height: 193 }}></div>
                            )
                        }
                    </a>
                        
                    <div className="book-shelf-changer">
                        <select onChange={this.changeCombo} value={shelf}>
                            <option value="move" disabled>Mover para...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want To Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
            </div>
        </li>
    )}

}

export default Book