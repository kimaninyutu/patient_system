import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
    const token = useSelector((state) => state.auth.token);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" render={() => (token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />)} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" render={() => (token ? <Dashboard /> : <Redirect to="/login" />)} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

