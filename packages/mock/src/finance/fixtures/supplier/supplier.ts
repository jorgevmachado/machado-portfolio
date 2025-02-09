import Supplier from '@repo/business/finance/supplier/supplier';
import {
  DAY_LABORER_SUPPLIER_CATEGORY_FIXTURE,
  ELECTRICITY_BILL_SUPPLIER_CATEGORY_FIXTURE,
  GARAGE_SUPPLIER_CATEGORY_FIXTURE,
  INTERNET_SUPPLIER_CATEGORY_FIXTURE,
  IPTU_SUPPLIER_CATEGORY_FIXTURE,
  RENT_SUPPLIER_CATEGORY_FIXTURE,
} from './category';

export const INGRID_RESIDENTIAL_RENT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Ingrid Residential - Rent',
  category: RENT_SUPPLIER_CATEGORY_FIXTURE,
});

export const INGRID_RESIDENTIAL_ELECTRICITY_BILL_SUPPLIER_FIXTURE: Supplier =
  new Supplier({
    name: 'Ingrid Residential - Electricity Bill',
    category: ELECTRICITY_BILL_SUPPLIER_CATEGORY_FIXTURE,
  });

export const INGRID_RESIDENTIAL_IPTU_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Ingrid Residential - IPTU',
  category: IPTU_SUPPLIER_CATEGORY_FIXTURE,
});

export const INGRID_RESIDENTIAL_INTERNET_SUPPLIER_FIXTURE: Supplier =
  new Supplier({
    name: 'Ingrid Residential - Internet',
    category: INTERNET_SUPPLIER_CATEGORY_FIXTURE,
  });

export const INGRID_RESIDENTIAL_GARAGE_SUPPLIER_FIXTURE: Supplier =
  new Supplier({
    name: 'Ingrid Residential - Garage',
    category: GARAGE_SUPPLIER_CATEGORY_FIXTURE,
  });
