/*
 * other constants
 */

import { LOGIN, SET_UID, SET_FOO } from './actionTypes';

/*
 * action creators
 */

import { createAction } from 'typesafe-actions';

export const countersActions = {
    setIsAuthenticated: createAction(LOGIN, (isAuthenticated: boolean) => ({
        type: LOGIN,
        isAuthenticated
    })),
    setUid: createAction(SET_UID, (uid: string) => ({
        type: SET_UID,
        uid
    })),
    setFoo: createAction(SET_FOO, (foo: string) => ({
        type: SET_FOO,
        foo
    }))
};

/*
export const setIsAuthenticated = (isAuthenticated: boolean): SetIsAuthenticated => {
    return { type: LOGIN, isAuthenticated };
};

export const setUid = (uid: string) => {
    return {type: SET_UID, uid};
};

type SetIsAuthenticated = {
    type: 'LOGIN',
    isAuthenticated: boolean
};

type SetUid = {
    type: 'UID',
    uid: string
};

export type Action =
    | SetIsAuthenticated
    | SetUid;

export type Dispatch = (action: Action) => void;
*/