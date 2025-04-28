import { useContext } from 'react';

import BillContext from './BillContext';

export default function useBill() {
    return useContext(BillContext);
}