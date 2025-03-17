import { Nest } from '../../api';
import { BillEntity } from './interface';
import Bill from "./bill";

export class BillService {
  constructor(private nest: Nest) {}

  public async getBillList() {
    return this.nest.finance.bill.getAll({}).then((response) => {
      const bills = response as Array<BillEntity>;
      return bills.map((bill) => new Bill(bill));
    });
  }
}

// Retorna { category: { type: [] } }
// return bills.reduce((result, bill) => {
//     const category = toSnakeCase(bill.category.name);
//     const type = bill.type;
//
//     if(!result[category]) {
//         result[category] = {};
//     }
//
//     if(!result[category][type]) {
//         result[category][type] = [];
//     }
//
//     result[category][type].push(bill);
//     return result;
// }, {})

// Retorna [ type: [] ]
// return bills.reduce((result, bill) => {
//     const type = bill.type;
//     const existingType = result.find((entry) => entry[type])
//
//
//     if (existingType) {
//         existingType[type].push(bill);
//     } else {
//         result.push({ [type]: [bill] });
//     }
//
//     return result;
// }, [])

// retorna [ title: '', list: [] ]
// return bills.reduce((result, bill) => {
//   const categoryTitle = bill.category.name;
//   const type = bill.type;
//   let category = result.find((entry) => entry.title === categoryTitle);
//   if (!category) {
//     category = {
//       title: categoryTitle,
//       list: {},
//     };
//     result.push(category);
//   }
//   if (!category.list[type]) {
//     category.list[type] = [];
//   }
//   category.list[type].push(bill);
//   return result;
// }, []).map((entry) => ({
//   title: entry.title,
//   list: Object.keys(entry.list).map((key) => ({
//     [key]: entry.list[key],
//   })),
// }));

// return response.reduce(
//     (
//         result: Array<{
//           title: string;
//           items: Record<string, Record<string, Bill[]>>;
//         }>,
//         item,
//     ) => {
//       const categoryTitle = item.category.name; // Nome da categoria
//       const typeKey = item.type.toLowerCase().replace(/ /g, '_'); // Tipo formatado como 'bank_slip', 'pix'
//       const bankName = item.bank.name.toLowerCase().replace(/ /g, '_'); // Nome do banco formatado
//
//       // Verificar se a categoria já existe no resultado
//       let category = result.find((entry) => entry.title === categoryTitle);
//
//       if (!category) {
//         // Se a categoria não existir, cria uma nova entrada
//         category = {
//           title: categoryTitle,
//           items: {},
//         };
//         result.push(category);
//       }
//
//       // Verificar se o tipo já existe na categoria
//       if (!category.items[typeKey]) {
//         category.items[typeKey] = {};
//       }
//
//       // Verificar se o banco já existe no tipo
//       if (!category.items[typeKey][bankName]) {
//         category.items[typeKey][bankName] = [];
//       }
//
//       // Adicionar o item no banco correspondente
//       category.items[typeKey][bankName].push(item);
//
//       return result;
//     },
//     [],
// );