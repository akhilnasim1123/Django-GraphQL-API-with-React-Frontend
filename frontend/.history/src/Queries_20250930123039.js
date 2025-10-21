
export const WHOAMI = gql`
  query ME {
    whoami {
      token
      refreshToken
      payload
    }
  }
`;