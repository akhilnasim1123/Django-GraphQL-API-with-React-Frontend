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


export const GET_USERS = gql`
  query ME {
    getUsers {
      revoked
    }
  }
`;