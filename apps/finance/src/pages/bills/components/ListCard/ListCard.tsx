import React from 'react';

import Bill from '@repo/business/finance/bill';

import Accordion from '@repo/ds/components/accordion/Accordion';
import { billBusiness } from '../../../../shared';
import { Expenses } from '../../../../layout';

type ListCardProps = {
  list: Array<Bill>;
  type: string;
};

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const currentList = billBusiness.mapBillListByItem(list, 'bank');
  return (
    <div>
      {currentList.map((item) => (
        <div key={item.title}>
          <h1>{item.title}</h1>
          {item.list.map((bill) => (
            <Accordion key={bill.id} title={bill.name}>
              <Expenses expenses={bill.expenses} />
            </Accordion>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListCard;
