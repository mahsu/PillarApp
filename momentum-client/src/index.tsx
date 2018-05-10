import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';
import ApolloClient from 'apollo-boost';
import { SESSION_JWT_EXP, SESSION_JWT_TOKEN } from './constants';
import { ApolloProvider } from 'react-apollo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import momentumApp from './redux/reducers';
import { countersActions } from './redux/actions';

const store = createStore(momentumApp);

const client = new ApolloClient({
    uri: '/auth/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: async (operation: any) => {
        const token = await localStorage.getItem(SESSION_JWT_TOKEN);
        operation.setContext({
            headers: {
                authorization: 'Bearer ' + token
            }
        });
    }, onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            console.log(graphQLErrors);
        }
        if (networkError) {
            console.log(networkError);
            localStorage.removeItem(SESSION_JWT_TOKEN);
            localStorage.removeItem(SESSION_JWT_EXP);
            store.dispatch(countersActions.setIsAuthenticated(false));
        }
    },
});

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
