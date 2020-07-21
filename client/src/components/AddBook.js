import React, { Component } from 'react';
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getBooksQuery } from "./BookList";
const getAuthorQuery = gql`
         {
            authors{
               id
               name
            }
         }`
const addBookMutation = gql`
         mutation($name:String! , $genre:String! , $authorId:ID!){
            addBook(name:$name , genre:$genre , authorId:$authorId){
               name
               id
            }
         }
`


class AddBook extends Component {
   constructor(props) {
      super(props)

      this.state = {
         name: '',
         genre: '',
         authorId: ''
      }
   }

   displayAuthors() {
      var data = this.props.getAuthorQuery
      if (data.loading) {
         return <option>Loading Books...</option>
      } else {
         return data.authors.map(author => {
            return (<option key={author.id} value={author.id}>{author.name}</option>)
         })
      }
   }

   submitHandler(e) {
      e.preventDefault()
      this.props.addBookMutation({
         variables: {
            name: this.state.name,
            genre: this.state.genre,
            authorId: this.state.authorId
         },
         refetchQueries: [{ query: getBooksQuery }]
      })

   }


   render() {
      return (
         <form onSubmit={this.submitHandler.bind(this)}>
            <div className="field">
               <label>Book Name:</label>
               <input type="text" onChange={(e) => { this.setState({ name: e.target.value }) }}></input>
            </div>


            <div className="field">
               <label>Book Genre:</label>
               <input type="text" onChange={(e) => { this.setState({ genre: e.target.value }) }}></input>
            </div>


            <div className="field">
               <label>Author:</label>
               <select type="text" onChange={(e) => { this.setState({ authorId: e.target.value }) }}>
                  <option>Select Author</option>
                  {this.displayAuthors()}
               </select>
            </div>
            <button>+</button>
         </form>
      )
   }
}

export default compose(
   graphql(getAuthorQuery, { name: 'getAuthorQuery' }),
   graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
