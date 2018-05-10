import * as React from 'react';
import { Redirect } from 'react-router';
import { SESSION_JWT_EXP, SESSION_JWT_TOKEN } from '../constants';

class Logout extends React.Component {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        localStorage.removeItem(SESSION_JWT_TOKEN);
        localStorage.removeItem(SESSION_JWT_EXP);
        console.log('Cleared localStorage jwt keys');
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }
}

export default Logout;