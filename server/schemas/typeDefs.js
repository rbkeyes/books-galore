const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    token: ID
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
  }

  input BookData {
    bookId: String!, 
    authors: [String], 
    description: String!, 
    title: String! 
    image: String, 
    link: String, 
  }

  type Mutation {
    addUser(
      username: String!, 
      email: String!, 
      password: String!
      ): Auth
    login(
      email: String!, 
      password: String!
      ): Auth
    saveBook(
      savedBooks: [BookData!]
      ): User
    removeBook(
      userId: ID!,
      bookId: String!
      ): User
  }
`;

module.exports = typeDefs;
