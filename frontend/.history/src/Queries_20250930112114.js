import gql from 'graphql-tag';

mutation{
  createUser(email:"mitulrathod86@gmail.com", username:"mitul", password:"MutationTest1"){
    user{
      id,
      username,
      email
    },
    token,
    refreshToken
  }
}