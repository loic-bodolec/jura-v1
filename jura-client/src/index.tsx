import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import Router from './components/router/Router';
import reportWebVitals from './reportWebVitals';
import { initApolloClient } from './services/api/ApolloClient/initApolloClient';
import './style/index.scss';

import registerServiceWorker from './serviceWorker';

const client = initApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// Above code will register the service worker. One thing we have to keep in mind it does not work with dev build, we have to run the production build.
registerServiceWorker();
