import React, { useEffect, useState } from 'react';

import type { FinanceEntity } from '@repo/business/finance/interface';

import useUser from '@repo/ui/hooks/user/useUser';

import { financeService } from '../../services';

import FinanceContext, { FinanceContextProps } from './FinanceContext';

interface FinanceProviderProps {
  children: React.ReactNode;
}
export default function FinanceProvider({ children }: FinanceProviderProps) {
  const { user } = useUser();
  const [finance, setFinance] = useState<FinanceEntity | null>(null);

  useEffect(() => {
    if (user.finance) {
      setFinance(user.finance);
      return;
    }
      financeService
      .initialize()
      .then((response) => setFinance(response))
      .catch((error) => console.error(error));
  }, []);

  const context: FinanceContextProps = {
    finance,
  };

  return (
    <FinanceContext.Provider value={context}>
      {children}
    </FinanceContext.Provider>
  );
}