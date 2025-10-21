
export const WHOAMI = gql`
  query ME {
    tokenAuth(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`;