import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'


class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onSearchLivros: PropTypes.func.isRequired,
        onAlterarEstadoLivro: PropTypes.func.isRequired,
        onSubmitDetaisBook: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }
    
    /**
    * @description Busca livros pelo texto digitado
    * @param {string} query - O valor a ser buscado
    */
    updateQuery = (query) => {
        this.setState({ query })
        this.props.onSearchLivros(query)
    }

    /**
    * @description Limpa a pesquisa
    */
    clearQuery = () => {
        this.setState({ query: '' })
        this.props.onSearchLivros('')
    }

    render() {
        const { books } = this.props
        const { query } = this.state
        const { onAlterarEstadoLivro } = this.props
        const { onSubmitDetaisBook } = this.props
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                    <input
                        type='text'
                        value={query}
                        placeholder="Search by title or author"
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />

                    </div>
                </div>
                {books.length <= 0 && (
                    <div className='search-books-results'>
                        <div className='showing-books'>
                            <span>No books found...</span>
                            <button onClick={this.clearQuery}>Clear filter</button>
                        </div>
                    </div>
                )}
                {books.length !== undefined && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {books.map((book) => (
                                <Book 
                                    key={book.id}
                                    book={book}
                                    onAlterarEstadoLivro={onAlterarEstadoLivro}
                                    shelf={'none'}
                                    onSubmitDetaisBook={onSubmitDetaisBook}
                                />
                            ))}
                        </ol>
                    </div>
                )}
                
            </div>
    )}

}

export default Search
