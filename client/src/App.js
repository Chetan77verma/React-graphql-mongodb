import React from 'react';
import './App.css';
import BookList from "../src/components/BookList"
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from "apollo-boost"
import AddBook from './components/AddBook';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>

  );
}

export default App;
