'use client';
import './Group.scss';
import Tag from '@repo/ds/components/tag/Tag';
import Table from '@repo/ds/components/table/Table';

export default function ExpenseGroupPage() {
  return (
    <Table
      items={[
        {
          name: 'Cupcake',
          calories: <Tag context="primary">305</Tag>,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
          color: 'red',
        },
        {
          name: 'Gingerbread',
          calories: <Tag context="primary">356</Tag>,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
          color: 'blue',
        },
        {
          name: 'Jelly bean',
          calories: <Tag context="primary">375</Tag>,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: <Tag context="primary">392</Tag>,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: <Tag context="primary">408</Tag>,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: <Tag context="primary">452</Tag>,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: <Tag context="primary">324</Tag>,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ]}
      headers={[
        {
          text: 'Dessert (100g serving)',
          sortable: true,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat', sortable: true },
        { text: 'Carbs (g)', value: 'carbs', sortable: true },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron', align: 'right' },
      ]}
      actions={{
          text: 'Actions fields',
          align: 'center',
          edit: { onClick: (item) => console.log('# => expense => edit => ', item) },
          delete: { onClick: (item) => console.log('# => expense => delete => ', item) }
        }}
      onRowClick={(item) => console.log('# => expense => onRowClick => ', item)}
    />
  );
}