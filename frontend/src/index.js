// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwtDecode from 'jwt-decode';

// UI Imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// App Imports
import registerServiceWorker from './registerServiceWorker'
import { setCurrentUser } from './actions/user';
import rootReducer from './reducers/root';
import App from './app';
import './index.css';

// Store
const store = createStore(
    rootReducer,

    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

// User Authentication
const token = localStorage.getItem('token');
if(token && token !== 'undefined' && token !== '') {
    store.dispatch(setCurrentUser(jwtDecode(token)));
}

// Touch support fix
injectTapEventPlugin();

// Render App
ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>,

    document.getElementById('root')
);

// Service Worker
registerServiceWorker();
