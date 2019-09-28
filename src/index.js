import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Initialize a new cache
const cache = new InMemoryCache();

// Creating the client
const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/",
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
