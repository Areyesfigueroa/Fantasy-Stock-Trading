import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserSessionContext = () => {
    const [userSession, setUserSession] = useLocalStorage('userSession', null);
    return createContext({ session: userSession, setSession: setUserSession });
};

export default UserSessionContext;