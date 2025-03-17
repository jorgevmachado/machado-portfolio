import React from 'react';

import type { FinanceEntity } from '@repo/business/finance/interface';

export interface FinanceContextProps {
  finance: FinanceEntity | null;
}

export default React.createContext<FinanceContextProps>({
  finance: null,
});