
export const WHOAMI = gql`
  query ME($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`;