import React from 'react';

import Bill from '@repo/business/finance/bill';

import Text from '@repo/ds/elements/text/Text';
import Accordion from '@repo/ds/components/accordion/Accordion';

import { billBusiness } from '../../../../shared';
import { Expenses } from '../../../../layout';

import './ListCard.scss';

type ListCardProps = {
  list: Array<Bill>;
  type: string;
};

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const currentList = billBusiness.mapBillListByItem(list, 'bank');
  return (
    <div className="list-card">
      {currentList.map((item) => (
        <div key={item.title} className="list-card__accordion">
          <Text tag="h1">{item.title}</Text>
          {item.list.map((bill) => (
            <Accordion key={bill.id} title={bill.name}>
              <Expenses
                expenses={bill.expenses}
                allCalculated={billBusiness.calculateAllBill(bill)}
              />
            </Accordion>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListCard;
