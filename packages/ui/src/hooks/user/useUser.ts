import { useContext } from 'react';

import UserContext from './UserContext';

export default function useUser() {
  const { user, update } = useContext(UserContext);

  return { user, update };
}