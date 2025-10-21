
export const WHOAMI = gql`
  query ME {
    me(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`;