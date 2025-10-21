import React from 'react';
import { Query } from 'react-apollo';
import { HELLO_QUERY } from './queries';

function App() {
  return (
    <Query query={HELLO_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;

        return <p>{data.hello}</p>;
      }}
    </Query>
  );
}

export default App;