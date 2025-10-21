import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`;


export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;


export const REVOKE_TOKEN = gql`
  mutation RevokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`;


export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($name: String!, $image: String!, $lead: String!) {
    createDepartment(name: $name, image: $image, lead: $lead) {
      department {
        id
        name
        lead
        image
      }
    }
  }
`;


export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id:String$name: String!, $image: String!, $lead: String!) {
    createDepartment(name: $name, image: $image, lead: $lead) {
      department {
        id
        name
        lead
        image
      }
    }
  }
`;
