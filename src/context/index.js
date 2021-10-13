import React from 'react';
import { StateProvider, useSelector, useDispatch } from 'use-hook-kits';
import { state, keySelector } from './stores';
import reducer from './reducers';
import { actions } from './actions';

const AppProvider = ({ children }) => (
    <StateProvider reducer={reducer} stores={state}>
        {children}
    </StateProvider>
);

export { AppProvider, StateProvider, useDispatch, actions, useSelector, keySelector };
