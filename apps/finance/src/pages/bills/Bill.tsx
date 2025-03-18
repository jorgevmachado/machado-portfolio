'use client';
import { useEffect, useState } from 'react';
import { billBusiness, billService } from '../../shared';
import Bill from '@repo/business/finance/bill';
import Tabs from '../../layout/components/Tabs';
import { SubTab } from './components';

type BillList = {
  title: string;
  list: Array<Bill>;
};

export default function BillPage() {
  const [items, setItems] = useState<Array<BillList>>([]);

  useEffect(() => {
    billService.getAll({}).then((response) => {
      if(Array.isArray(response)) {
        const currentResponse = billBusiness.mapBillListByItem(
            response,
            'category',
        );
        setItems(currentResponse);
      }
    });
  }, []);
  return (
    <Tabs
      fluid
      tabItems={items.map((item) => ({
        title: item.title,
        children: <SubTab key={item.title} list={item.list} />,
      }))}
    />
  );
}