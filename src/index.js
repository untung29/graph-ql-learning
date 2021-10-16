import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// From Apollo !! (library: react-apollo, apollo-boost, and graphql)
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient, gql } from "apollo-boost";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

// Apollo!!
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});

// To be able to make a cache
const cache = new InMemoryCache();

// Make a client
const client = new ApolloClient({
  link: httpLink,
  cache,
});

// Example of using GraphQL
// client
//   .query({
//     query: gql`
//       {
//         getCollectionsByTitle(title: "hats") {
//           id
//           title
//           items {
//             id
//             name
//             price
//             imageUrl
//           }
//         }
//       }
//     `,
//   })
//   .then(res => console.log(res));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root"),
);
