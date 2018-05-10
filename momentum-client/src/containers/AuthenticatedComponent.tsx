import * as React from 'react';
import { Redirect } from 'react-router';
import { SESSION_JWT_EXP, SESSION_JWT_TOKEN } from '../constants';
import { connect } from 'react-redux';
import { State } from '../redux/reducers';

interface AuthenticatedComponentProps extends State {
    location?: any;
    children?: React.ReactNode;
}

class AuthenticatedComponent extends React.Component<AuthenticatedComponentProps, {}> {

    static isAuthenticated(): boolean {
        let jwtToken: string | null = localStorage.getItem(SESSION_JWT_TOKEN);
        let expiration: string | null = localStorage.getItem(SESSION_JWT_EXP);

        if (jwtToken == null || expiration == null) {
            console.log('Token not found');
            return false;
        }

        if (new Date(expiration).getTime() < new Date().getTime()) {
            console.log('token expired');
            return false;
        }

        console.log('User is authenticated!');
        return true;
    }

    constructor(props: AuthenticatedComponentProps) {
        super(props);
    }

    render() {
        if (AuthenticatedComponent.isAuthenticated()) {
            return (this.props.children);
        } else {

            return (
                <Redirect to={{pathname: '/login', state: {from: this.props.location}}}/>
            );
        }
    }
}

/*interface DispatchFromProps {
    setIsAuthenticated: (isLogin: boolean) => void;
}*/

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.isAuthenticated
});

/*const mapDispatchToProps = (dispatch: Dispatch ) => ({
    setIsAuthenticated: (isLogin: boolean) => dispatch(setIsAuthenticated(isLogin))
});*/
export default connect<any, any, {}>(
    mapStateToProps,
    null
)(AuthenticatedComponent);