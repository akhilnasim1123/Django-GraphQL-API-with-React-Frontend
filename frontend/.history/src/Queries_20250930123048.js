
export const WHOAMI = gql`
  query ME {
    whoami {
      id
      username
      email
    }
  }
`;