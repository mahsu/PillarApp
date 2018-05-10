import * as React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const logo = require('../images/logo.svg');
let jsep = require('jsep');

class Home extends React.Component {

    componentDidMount() {
        var parseTree = jsep('1+1');
        console.log(parseTree);
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Momentum</h1>
                </header>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                    <li><Link to="/models">Models</Link></li>
                </ul>
            </div>
        );
    }
}

export default Home;