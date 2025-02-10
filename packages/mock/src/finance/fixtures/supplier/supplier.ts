import Supplier from '@repo/business/finance/supplier/supplier';
import {
    BILLS_SUPPLIER_TYPE_FIXTURE,
    HEALTH_SUPPLIER_TYPE_FIXTURE,
    HOUSING_SUPPLIER_TYPE_FIXTURE,
    TRANSPORT_SUPPLIER_TYPE_FIXTURE,
} from './type';

export const VIVO_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Vivo',
  active: true,
  description: 'Communication Services Provider.',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
});

export const CLARO_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Claro',
  active: true,
  description: 'Communication Services Provider.',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
});

export const NEOENERGIA_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Neoenergia',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Electricity Service Provider.',
});

export const IPTU_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'IPTU',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Urban Property and Territorial Tax.',
});

export const RENT_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Rent',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Rental Fee.',
});

export const DAY_LABORER_DIDI_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Day Laborer Didi',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Daily Labor Fee.',
});

export const DAY_LABORER_LUANA_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    name: 'Day Laborer Luana',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    description: 'Daily Labor Fee.',
});

export const CONDOMINIUM_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Condominium',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Condominium Fee.',
});

export const GARAGE_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Garage',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Garage Rental Fee.',
});

export const UNIMED_HEALTH_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Unimed',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Unimed Insurance Health Plan.',
});

export const IPVA_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'IPVA',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Motor Vehicle Property Tax.',
});

export const LICENSING_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Licensing',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Licensing Fee.',
});

export const CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  name: 'Car Insurance',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  description: 'Car Insurance Monthly Fee.',
});

export const NUBANK_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = new Supplier({
    name: 'Nubank',
    type: BILLS_SUPPLIER_TYPE_FIXTURE,
    active: true,
    description: 'Credit card Monthly Fee.',
});

export const PORTO_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = new Supplier({
    name: 'Porto',
    type: BILLS_SUPPLIER_TYPE_FIXTURE,
    active: true,
    description: 'Credit card Monthly Fee.',
});

export const OLD_BIKERS_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
    name: 'Old Bikers',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
    active: true,
    description: 'Motorcycle Mechanic Workshop.',
})

export const LIST_SUPPLIER_FIXTURE: Array<Supplier> = [
    VIVO_HOUSING_SUPPLIER_FIXTURE,
    CLARO_HOUSING_SUPPLIER_FIXTURE,
    NEOENERGIA_HOUSING_SUPPLIER_FIXTURE,
    IPTU_HOUSING_SUPPLIER_FIXTURE,
    RENT_HOUSING_SUPPLIER_FIXTURE,
    DAY_LABORER_DIDI_HOUSING_SUPPLIER_FIXTURE,
    DAY_LABORER_LUANA_HOUSING_SUPPLIER_FIXTURE,
    CONDOMINIUM_HOUSING_SUPPLIER_FIXTURE,
    GARAGE_HOUSING_SUPPLIER_FIXTURE,
    UNIMED_HEALTH_SUPPLIER_FIXTURE,
    IPVA_TRANSPORT_SUPPLIER_FIXTURE,
    LICENSING_TRANSPORT_SUPPLIER_FIXTURE,
    CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE,
    NUBANK_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE,
    PORTO_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE,
    OLD_BIKERS_TRANSPORT_SUPPLIER_FIXTURE
]