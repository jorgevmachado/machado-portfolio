// import { ResultResponse } from '../../../shared/interface';
//
// import { EExpenseType, EMonth } from '@repo/business/finance/enum';
// import { validateEntity, validateEntityType } from '../validate';
// import { FinanceEntity } from '../interface';
//
// interface CreateEntityParams {
//   name?: string;
//   type?: string;
//   entity: FinanceEntity;
// }
//
// interface CreateEntityByNameParams {
//   name: string;
//   entity: FinanceEntity;
//   isType?: boolean;
// }
//
// interface CreateEntityWithTypeParams {
//   name: string;
//   type: string;
//   entity: FinanceEntity;
// }
//
// export function createEntity({ name, type, entity }: CreateEntityParams) {
//   if (Boolean(entity.type)) {
//     return createEntityWithType({ name, type, entity });
//   }
//
//   return createEntityByName({ name, entity });
// }
//
// function createEntityWithType({
//   name,
//   type,
//   entity,
// }: CreateEntityWithTypeParams) {
//   const entityResult = createEntityByName({
//     name,
//     entity,
//   });
//   if (entityResult.statusCode !== 200) {
//     return entityResult;
//   }
//   const entityTypeResult = createEntityByName({
//     name: type,
//     entity: entity.type,
//     isType: true,
//   });
//   if (entityTypeResult.statusCode !== 200) {
//     return entityTypeResult;
//   }
//   return {
//     response: {
//       ...(entityResult.response as object),
//       type: entityTypeResult.response,
//     },
//     statusCode: 200,
//   };
// }
//
// function createEntityByName({
//   name,
//   entity,
//   isType,
// }: CreateEntityByNameParams) {
//   const exists = validateEntity({ name, entity, isType });
//   if (exists.statusCode !== 200) {
//     return exists;
//   }
//   return {
//     response: buildEntityResponse(name),
//     statusCode: 200,
//   };
// }
//
// function createEntityExpense(
//   entity: FinanceEntity,
//   group: string,
//   supplier: string,
//   category: string,
// ) {
//   const groupResultResponse = buildEntityRelations(group, entity.group.list);
//   if (groupResultResponse.statusCode !== 200) {
//     return groupResultResponse;
//   }
//
//   const supplierResultResponse = buildEntityRelations(
//     supplier,
//     entity.supplier.list,
//   );
//   if (supplierResultResponse.statusCode !== 200) {
//     return supplierResultResponse;
//   }
//
//   const categoryResultResponse = buildEntityRelations(
//     category,
//     entity.category.list,
//   );
//   if (categoryResultResponse.statusCode !== 200) {
//     return categoryResultResponse;
//   }
//   return {
//     response: {
//       id: '',
//       year: new Date().getFullYear(),
//       type: EExpenseType.VARIABLE,
//       paid: false,
//       value: 0,
//       total: 0,
//       month: EMonth.JANUARY,
//       group: groupResultResponse.response,
//       active: true,
//       supplier: supplierResultResponse.response,
//       category: categoryResultResponse.response,
//       total_paid: 0,
//       january: 0,
//       february: 0,
//       march: 0,
//       april: 0,
//       may: 0,
//       june: 0,
//       july: 0,
//       august: 0,
//       september: 0,
//       october: 0,
//       november: 0,
//       december: 0,
//       january_paid: false,
//       february_paid: false,
//       march_paid: false,
//       april_paid: false,
//       may_paid: false,
//       june_paid: false,
//       july_paid: false,
//       august_paid: false,
//       september_paid: false,
//       october_paid: false,
//       november_paid: false,
//       december_paid: false,
//       created_at: new Date(),
//       updated_at: new Date(),
//       deleted_at: undefined,
//       description: undefined,
//       instalment_number: 1,
//     },
//     statusCode: 200,
//   };
// }
//
// function buildEntityRelations(
//   name: string,
//   list: Array<unknown>,
// ): ResultResponse {
//   const entity = list.find((item) => item['name'] === name);
//   const validate = validateEntityType(Boolean(entity), 'field');
//   if (validate.statusCode !== 200) {
//     return validate;
//   }
//   return {
//     response: entity,
//     statusCode: 200,
//   };
// }
//
// function buildEntityResponse(name: string) {
//   return {
//     id: 'ac0138cd-4910-4000-8000-000000000000',
//     name,
//     created_at: new Date(),
//     updated_at: new Date(),
//     deleted_at: undefined,
//   };
// }

import { FinanceEntity } from '../../interface';

interface CreateEntityParams {
  name?: string;
  type?: string;
  entity: FinanceEntity;
}
export function createEntity({ name, type, entity }: CreateEntityParams) {
  if (Boolean(entity.type)) {
    return createEntityWithType({ name, type, entity });
  }

  return createEntityByName({ name, entity });
}

function createEntityWithType({ name, type, entity }: CreateEntityParams) {
   const entityResult = createEntityByName({ name, entity });
    const entityTypeResult = createEntityByName({ name: type, entity: entity.type });
   if(!entityResult) {
     return entityResult;
   }
   return {
     ...(entityResult as object),
     type: entityTypeResult,
   }
}

function createEntityByName({ name, entity }: CreateEntityParams) {
    const result = findEntityByName(name, entity.list);
    if(!result) {
    return {
      id: 'ac0138cd-4910-4000-8000-000000000000',
      name,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
    }
  }
  return result;
}

export function findEntityByName(name: string, list: Array<unknown>) {
    return list?.find((item) => item['name'] === name);
}