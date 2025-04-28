import { useContext } from 'react';

import AlertContext from './AlertContext';

export default function useAlert() {
  const { add, alerts } = useContext(AlertContext);

  return { addAlert: add, alerts };
}
