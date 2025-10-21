
export const WHOAMI = gql`
  mutation ME($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`;