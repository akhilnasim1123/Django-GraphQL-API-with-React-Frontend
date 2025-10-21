
export const WHOAMI = gql`
  query ME {
    whoami(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`;