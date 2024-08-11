import { createContext, useState } from 'react';
import UserData from './components/mainpages/results/UserApi.js';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
   const [token, setToken] = useState(false);
    //const user = UserData();

    const state = {
        token: [token, setToken],
        userApi:UserData()
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
