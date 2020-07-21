import React, { Component } from 'react'
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo'
import BookDetails from "./BookDetails"
export const getBooksQuery = gql`
         {
            books{
               id
               name
               genre
            }
         }`
class BookList extends Component {
   constructor(props) {
      super(props)

      this.state = {
         selectedId: null
      }
   }

   displayBooks() {
      var data = this.props.data
      if (data.loading) {
         return <div>Loading Books...</div>
      } else {
         return data.books.map(book => {
            return (<li key={book.id} onClick={() => this.setState({ selectedId: book.id })}>{book.name}</li>)
         })
      }
   }
   render() {
      const { selectedId } = this.state
      return (
         <div>
            <ul id="book-list">
               {this.displayBooks()}
            </ul>
            <BookDetails bookId={selectedId} />
         </div>
      )
   }
}

export default graphql(getBooksQuery)(BookList)
