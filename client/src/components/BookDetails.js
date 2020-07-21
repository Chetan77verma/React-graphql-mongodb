import React, { Component } from 'react'
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';

const getBookQuery = gql`
      query($id : ID){
         book(id: $id){
            name
            genre
            author{
               name
               age
               books{
                  id
                  name
                  genre
               }
            }
         }
      }
`
class BookDetails extends Component {
   displayBook() {
      const { book } = this.props.data
      if (book) {
         return <div >
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <p>All books by the author :</p>
            <ul className="other-books">
               {book.author.books.map(book => {
                  return <li key={book.id}>{book.name}</li>
               })}
            </ul>
         </div>
      } else {
         return <div>No Book Selected</div>
      }
   }
   render() {
      return (
         <div id="book-details">
            {this.displayBook()}
         </div>
      )
   }
}

export default graphql(getBookQuery, {
   options: (props) => {
      return {
         variables: {
            id: props.bookId
         }
      }
   }
})(BookDetails)
