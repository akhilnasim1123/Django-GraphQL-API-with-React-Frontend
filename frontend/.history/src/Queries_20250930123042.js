
export const WHOAMI = gql`
  query ME {
    whoami {
      id
      refreshToken
      payload
    }
  }
`;