import React from 'react';

import { capitalize, separateCamelCase, toCamelCase } from '@repo/services/string/string';

import Bill from '@repo/business/finance/bill';

import { billBusiness } from '../../../../shared';

import Tabs from '../../../../layout/components/Tabs';

import ListCard from '../ListCard';

type SubTabProps = {
  list: Array<Bill>;
};

const SubTab: React.FC<SubTabProps> = ({ list }) => {
  const currentList = billBusiness.mapBillListByItem(list, 'type');
  const currentTitle = (title: string) => {
    const camelCaseTitle = toCamelCase(title);
    const separateCamelCaseTitle = separateCamelCase(camelCaseTitle);
    return capitalize(separateCamelCaseTitle);
  };
  return (
    <Tabs
      fluid
      tabItems={currentList.map((item) => ({
        title: currentTitle(item.title),
        children: (
          <ListCard key={item.title} list={item.list} type={item.title} />
        ),
      }))}
    />
  );
};

export default SubTab;