import { gql } from '@apollo/client';
export const WHOAMI = gql`
  query ME {
    whoami {
      id
      username
      email
      bio
    }
  }
`;


export const USER = gql`
  query ME {
    users {
      id
      username
      email
      bio
    }
  }
`;