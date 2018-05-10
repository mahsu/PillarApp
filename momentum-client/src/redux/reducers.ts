import { combineReducers } from 'redux';
import { LOGIN, SET_UID, SET_FOO } from './actionTypes';

export type State = {
    readonly isAuthenticated?: boolean
    readonly uid?: string | null
    foo?: string |null
};

function setIsAuthenticated(state: any = null, action: any) {
    switch (action.type) {
        case LOGIN:
            return action.isAuthenticated;
        default:
            return state;
    }
}

function uid(state: any = null, action: any) {
    switch (action.type) {
        case SET_UID:
            return action.uid;
        default:
            return state;
    }
}

function foo(state: any = null, action: any) {
    switch (action.type) {
        case SET_FOO:
            return action.foo;
        default:
            return state;
    }
}

const momentumApp = combineReducers({
    setIsAuthenticated,
    uid,
    foo
});

export default momentumApp;