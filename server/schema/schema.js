const graphql = require('graphql');
const _ = require('lodash');
const mongoose = require('mongoose');


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;


const Book = require("../models/book");
const Author = require("../models/author");


//credential for cluster
const USER_NAME = ""
const PASSWORD = ""

const dbLink = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0-5ada4.mongodb.net/learninggraphql?retryWrites=true&w=majority`


mongoose.connect(dbLink, { useUnifiedTopology: true });
mongoose.connection.once("open", () => {
   console.log("database connected !");
});

//dummy data
// If you want to do things without database , just comment the db stuff and uncomment the dummy data which is commented now !

// var books = [
//    { name: "maths", genre: "mind", id: "1", authorId: "1" },
//    { name: "c++", genre: "computer", id: "2", authorId: "2" },
//    { name: "biology", genre: "body", id: "3", authorId: "3" },
//    { name: "electrical", genre: "science", id: "3", authorId: "2" },
//    { name: "giology", genre: "earth", id: "4", authorId: "2" },
//    { name: "phycology", genre: "mind", id: "5", authorId: "3" }
// ]

// var author = [
//    { name: "Hitesh", age: 40, id: "1" },
//    { name: "Avinish", age: 25, id: "2" },
//    { name: "Ankush", age: 30, id: "3" }
// ]

const BookType = new GraphQLObjectType({
   name: "Book",
   fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
         type: AuthorType,
         resolve(parent, args) {
            console.log(parent)
            // return _.find(author, { id: parent.authorId })
            return Author.findById(parent.authorId)
         }
      }
   })
})
const AuthorType = new GraphQLObjectType({
   name: "Author",
   fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            // return _.filter(books, { authorId: parent.id })
            return Book.find({ authorId: parent.id })
         }
      }
   })
})

const RootQuery = new GraphQLObjectType({
   name: "RootQueryType",
   fields: {
      book: {
         type: BookType,
         args: { id: { type: GraphQLID } },
         resolve(parent, args) {
            console.log(typeof (args.id));
            //get data from db
            // return _.find(books, { id: args.id });
            return Book.findById(args.id);
         }
      },
      author: {
         type: AuthorType,
         args: { id: { type: GraphQLID } },
         resolve(parent, args) {
            console.log(typeof (args.id));
            //get data from db
            // return _.find(author, { id: args.id });
            return Author.findById(args.id);
         }
      },
      books: {
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            // return books
            return Book.find({})
         }
      },
      authors: {
         type: new GraphQLList(AuthorType),
         resolve(parent, args) {
            // return author
            return Author.find({});
         }
      }
   }
})

const Mutation = new GraphQLObjectType({
   name: "Mutation",
   fields: {
      addAuthor: {
         type: AuthorType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            age: { type: new GraphQLNonNull(GraphQLInt) }
         },
         resolve(parent, args) {
            let author = new Author({
               name: args.name,
               age: args.age
            })
            return author.save();
         }
      },
      addBook: {
         type: BookType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            genre: { type: new GraphQLNonNull(GraphQLString) },
            authorId: { type: new GraphQLNonNull(GraphQLID) }
         },
         resolve(parent, args) {
            let book = new Book({
               name: args.name,
               genre: args.genre,
               authorId: args.authorId
            })
            return book.save();
         }
      }
   }
});

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
})
