// Imports
import React from 'react';
import { Route, Switch } from 'react-router-dom'

// App Imports
import Layout from './components/layout'
import UserLogin from './components/user/login';
import UserRegister from './components/user/register';
import About from './components/about';
import Transaction from './components/transaction';
import PageNotFound from './components/page-not-found';
import AddTransaction from './components/addTransaction';
import Report from './components/report';
const App  = () => (
    <Layout>
        <Switch>
            {/* <Route exact path="/" component={ TweetListContainer } />
             <Route path="/tweet/add" component={ TweetAdd } />
             <Route path="/tweet/:tweetId" component={ TweetViewContainer } />*/}
            <Route path="/report" component={ Report } /> 
            <Route path="/user/login" component={ UserLogin } />
            <Route path="/user/register" component={ UserRegister } />
            <Route path="/about" component={ About } />
            <Route path="/transaction" component={ Transaction } />
            <Route path="/add/transaction" component={ AddTransaction } />
            <Route component={ PageNotFound }/>

        </Switch>
    </Layout>
);

export default App;
