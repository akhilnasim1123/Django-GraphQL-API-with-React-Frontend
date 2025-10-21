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


export const GET = gql`
  mutation RevokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`;