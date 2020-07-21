const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require("./schema/schema");
const server = express();

server.use(cors({
   origin: 'http://localhost:3000'
}))

server.use("/graphql", graphqlHTTP({
   schema: schema,
   graphiql: true
}))

server.listen(4000, () => {
   console.log('app is listening to port 4000');
})