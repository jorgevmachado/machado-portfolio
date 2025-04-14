import React from 'react';

import Bill from '@repo/business/finance/bill';

import Text from '@repo/ds/elements/text/Text';
import Accordion from '@repo/ds/components/accordion/Accordion';

import Icon from '@repo/ds/elements/icon/Icon';

import { billBusiness } from '../../../../shared';

import useBill from '../../useBill';

import Expenses from '../Expenses';

import './ListCard.scss';

type ListCardProps = {
  list: Array<Bill>;
  type: string;
};

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const { handleOpenModal } = useBill();
  const currentList = billBusiness.mapBillListByItem(list, 'bank');
  const renderChildrenTitle = (bill: Bill) => {
    return (
      <div className="list-card__accordion--title">
        <Text>{bill.name}</Text>
        <Icon
          icon="edit"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModal(bill);
          }}
        />
      </div>
    );
  };
  return (
    <div className="list-card">
      {currentList.map((item) => (
        <div key={item.title} className="list-card__accordion">
          <Text tag="h1">{item.title}</Text>
          {item.list.map((bill) => (
            <Accordion
              key={bill.id}
              title={bill.name}
              childrenTitle={renderChildrenTitle(bill)}
              subtitle={bill.year?.toString()}
            >
              <Expenses
                bill={bill}
                // allCalculated={billBusiness.calculateAllBill(bill)}
              />
            </Accordion>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListCard;
