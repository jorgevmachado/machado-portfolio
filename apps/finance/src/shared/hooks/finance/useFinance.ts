import { useContext } from 'react';

import FinanceContext from './FinanceContext';

export default function useFinance() {
  return useContext(FinanceContext);
}