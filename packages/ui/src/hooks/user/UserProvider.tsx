import React, {useEffect, useState} from 'react';

import { User } from '@repo/business/auth/interface';

import UserContext from './UserContext';

interface userProviderProps {
  user: User;
  children: React.ReactNode;
}

export default function UserProvider({ user, children }: userProviderProps) {
    const [_user, _setUser] = useState<User>(user);

    useEffect(() => { _setUser(user); }, []);

    const update = (user: User) => { _setUser(user); };

    return (
        <UserContext.Provider value={{ user: _user, update }}>
            {children}
        </UserContext.Provider>
    );
}