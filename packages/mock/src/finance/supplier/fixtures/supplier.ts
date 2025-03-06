import Supplier from '@repo/business/finance/supplier/supplier';

import { FinanceEntity } from '../../interface';

import {
  BILLS_SUPPLIER_TYPE_FIXTURE, FOOD_SUPPLIER_TYPE_FIXTURE,
  HEALTH_SUPPLIER_TYPE_FIXTURE,
  HOUSING_SUPPLIER_TYPE_FIXTURE, LEISURE_SUPPLIER_TYPE_FIXTURE,
  SUPPLIER_TYPE_FINANCE_ENTITY,
  TRANSPORT_SUPPLIER_TYPE_FIXTURE, UNKNOWN_SUPPLIER_TYPE_FIXTURE,
} from '../../supplier-type';

export const VIVO_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '4dff3e08-fe12-4d95-b810-b9d70710d95d',
  name: 'Vivo',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-01T19:00:18.705Z'),
  updated_at: new Date('2025-02-01T19:00:18.705Z'),
  deleted_at: null,
  description: 'Communication Services Provider.',
});

export const CLARO_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '5893ba7c-ec33-4bcc-af60-ba997fd9e7de',
  name: 'Claro',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-02T19:00:18.705Z'),
  updated_at: new Date('2025-02-02T19:00:18.705Z'),
  deleted_at: null,
  description: 'Communication Services Provider.',
});

export const NEOENERGIA_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'f4e812fe-eb68-4728-8d41-6e19dfea0e74',
  name: 'Neoenergia',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-03T19:00:18.705Z'),
  updated_at: new Date('2025-02-03T19:00:18.705Z'),
  deleted_at: null,
  description: 'Electricity Service Provider.',
});

export const IPTU_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'f6955c58-9e02-42b0-a70a-4467470098d7',
  name: 'IPTU',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-04T19:00:18.705Z'),
  updated_at: new Date('2025-02-04T19:00:18.705Z'),
  deleted_at: null,
  description: 'Urban Property and Territorial Tax.',
});

export const RENT_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '3c46fb00-b744-4b70-a558-86eaf0cfc061',
  name: 'Rent',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-05T19:00:18.704Z'),
  updated_at: new Date('2025-02-05T19:00:18.704Z'),
  deleted_at: null,
  description: 'Rental Fee.',
});

export const DAY_LABORER_DIDI_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier(
  {
    id: 'ef659db9-acfa-4a03-8dfa-330727f78d74',
    name: 'Day Laborer Didi',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-06T19:00:18.705Z'),
    updated_at: new Date('2025-02-06T19:00:18.705Z'),
    deleted_at: null,
    description: 'Daily Labor Fee.',
  },
);

export const DAY_LABORER_LUANA_HOUSING_SUPPLIER_FIXTURE: Supplier =
  new Supplier({
    id: 'd638a4cb-538e-4954-bcee-4c3d0a453478',
    name: 'Day Laborer Luana',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    description: 'Daily Labor Fee.',
    created_at: new Date('2025-02-07T19:00:18.707Z'),
    updated_at: new Date('2025-02-07T19:00:18.707Z'),
    deleted_at: null,
    active: true,
  });

export const CONDOMINIUM_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'b0178cf7-2a0b-4fad-8e46-076b0abb930b',
  name: 'Condominium',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-08T19:00:18.713Z'),
  updated_at: new Date('2025-02-08T19:00:18.713Z'),
  deleted_at: null,
  description: 'Condominium Fee.',
});

export const GARAGE_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'c09bb2a6-9b40-4c80-96c5-0fdf3267486a',
  name: 'Garage',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-09T19:00:18.724Z'),
  updated_at: new Date('2025-02-09T19:00:18.724Z'),
  deleted_at: null,
  description: 'Garage Rental Fee.',
});

export const UNIMED_HEALTH_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'd7129143-ca24-45eb-acc3-f4f7bdec909b',
  name: 'Unimed',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-10T19:00:18.722Z'),
  updated_at: new Date('2025-02-10T19:00:18.722Z'),
  deleted_at: null,
  description: 'Unimed Insurance Health Plan.',
});

export const IPVA_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '809c5067-4909-49a7-9d85-10c103c6769b',
  name: 'IPVA',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-11T19:00:18.709Z'),
  updated_at: new Date('2025-02-11T19:00:18.709Z'),
  deleted_at: null,
  description: 'Motor Vehicle Property Tax.',
});

export const LICENSING_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '9a95113b-de64-4492-befa-3040b5a9ad57',
  name: 'Licensing',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-12T19:00:18.712Z'),
  updated_at: new Date('2025-02-12T19:00:18.712Z'),
  deleted_at: null,
  description: 'Licensing Fee.',
});

export const CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '76baa64b-5a15-44a6-9c18-8bff59a9e5f7',
  name: 'Car Insurance',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-13T19:00:18.713Z'),
  updated_at: new Date('2025-02-13T19:00:18.713Z'),
  deleted_at: null,
  description: 'Car Insurance Monthly Fee.',
});

export const NUBANK_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = new Supplier(
  {
    id: '50d9ad0e-5833-4bf4-978e-c54ef1dcc8a2',
    name: 'Nubank',
    type: BILLS_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-14T19:00:18.713Z'),
    updated_at: new Date('2025-02-14T19:00:18.713Z'),
    deleted_at: null,
    description: 'Credit card Monthly Fee.',
  },
);

export const PORTO_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '3658a6bd-2fa4-4b11-93d8-25ae8d63500e',
  name: 'Porto',
  type: BILLS_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-15T19:00:18.713Z'),
  updated_at: new Date('2025-02-15T19:00:18.713Z'),
  deleted_at: null,
  description: 'Credit card Monthly Fee.',
});

export const CAIXA_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'dc4e0f4d-9427-4d81-a7a8-cd0ded8a625a',
  name: 'Caixa',
  type: BILLS_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-16T19:00:18.713Z'),
  updated_at: new Date('2025-02-16T19:00:18.713Z'),
  deleted_at: null,
  description: 'Credit card Monthly Fee.',
});

export const OLD_BIKERS_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '1781d932-aaf8-4c8d-be3b-db23ffa602c7',
  name: 'Old Bikers',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-17T19:00:18.713Z'),
  updated_at: new Date('2025-02-17T19:00:18.713Z'),
  deleted_at: null,
  description: 'Motorcycle Mechanic Workshop.',
});

export const ANCAR_GESTAO_DE_EMP_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'e355047e-33d0-41c3-9ee9-b069df7a2f61',
  name: 'Ancar Gestao de emp',
  type: UNKNOWN_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-18T19:00:18.713Z'),
  updated_at: new Date('2025-02-18T19:00:18.713Z'),
  deleted_at: null,
});

export const APACHE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'd959471c-298a-48c6-87d1-705d8780969d',
  name: 'Apache',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-19T19:00:18.713Z'),
  updated_at: new Date('2025-02-19T19:00:18.713Z'),
  deleted_at: null,
});

export const ATACADAO_DIA_A_DIA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '4072269b-b1cb-460a-8514-97826ab7bac9',
  name: 'Atacadão Dia a Dia',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-20T19:00:18.713Z'),
  updated_at: new Date('2025-02-20T19:00:18.713Z'),
  deleted_at: null,
});

export const BAR_DO_JAPA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '6aa699c3-dd9c-4f7d-a805-9db256f62843',
  name: 'Bar do Japa',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-21T19:00:18.713Z'),
  updated_at: new Date('2025-02-21T19:00:18.713Z'),
  deleted_at: null,
});

export const BARUC_RESTAURANT_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'edc8c8f5-d60f-4e08-af14-7a740f511563',
  name: 'Baruc Restaurante',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-22T19:00:18.713Z'),
  updated_at: new Date('2025-02-22T19:00:18.713Z'),
  deleted_at: null,
});

export const BG_NORTE_PETROLEO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '2aa27cf8-3e15-494b-9ddd-28293653edeb',
  name: 'Bg Norte Petroleo',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-23T19:00:18.713Z'),
  updated_at: new Date('2025-02-23T19:00:18.713Z'),
  deleted_at: null,
  description: 'São Paulo'
});

export const BRASCANSTHRP_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '8fcc00e0-0b28-4869-af4e-2067449b3c1c',
  name: 'Brascansthrp',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-24T19:00:18.713Z'),
  updated_at: new Date('2025-02-24T19:00:18.713Z'),
  deleted_at: null,
  description: 'São Paulo'
});

export const BROSSMAN_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '0da52fd3-b4f9-4fba-b80b-1976fe15694f',
  name: 'Brossman',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-25T19:00:18.713Z'),
  updated_at: new Date('2025-02-25T19:00:18.713Z'),
  deleted_at: null,
});

export const CADEIRA_DESIGN_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'e9813b0b-b544-49f6-b332-353fc91e43f5',
  name: 'Cadeira Design Studio',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-26T19:00:18.713Z'),
  updated_at: new Date('2025-02-26T19:00:18.713Z'),
  deleted_at: null,
});

export const CAIOCESARROCHAMEN_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '848aa6d9-d1f4-452e-80ad-d978966debef',
  name: 'Caiocesarrochamen',
  type: UNKNOWN_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-27T19:00:18.713Z'),
  updated_at: new Date('2025-02-27T19:00:18.713Z'),
  deleted_at: null,
});

export const CASCOL_COMBUSTIVEIS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '5c41b80c-029a-4158-9098-13bbf47878dc',
  name: 'Cascol Combustiveis',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-02-28T19:00:18.713Z'),
  updated_at: new Date('2025-02-28T19:00:18.713Z'),
  deleted_at: null,
});

export const CASTELO_CAMPOS_DO_JORDAO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '615567b9-4352-4cb3-92e0-5b889492283c',
  name: 'Castelo Campos do jordão',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-01T19:00:18.713Z'),
  updated_at: new Date('2025-03-01T19:00:18.713Z'),
  deleted_at: null,
  description: 'Campos do Jordão - SP'
});

export const CONDOMINIO_CIVIL_BRASIL_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '85d834b5-4256-45fc-894a-c96071852a1c',
  name: 'Condominio Civil Brasil',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-02T19:00:18.713Z'),
  updated_at: new Date('2025-03-02T19:00:18.713Z'),
  deleted_at: null,
  description: 'São Paulo'
});

export const CONFIANCE_GESTAO_CONDO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'e9b1ad35-458e-40b1-a348-cc96ae22120b',
  name: 'Confiance Gestao Condo',
  type: UNKNOWN_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-03T19:00:18.713Z'),
  updated_at: new Date('2025-03-03T19:00:18.713Z'),
  deleted_at: null,
});

export const CONFRARIA_DA_BARBA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '323c8af9-553c-4e95-ac71-3ba9294b9548',
  name: 'Confraria da Barba',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-04T19:00:18.713Z'),
  updated_at: new Date('2025-03-04T19:00:18.713Z'),
  deleted_at: null,
});

export const DAISO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'b32c5b32-5b70-478a-9fd0-d7f665d520bb',
  name: 'Daiso',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-05T19:00:18.713Z'),
  updated_at: new Date('2025-03-05T19:00:18.713Z'),
  deleted_at: null,
});

export const DJACI_MARTINS_BEZERRA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'f9f68b6f-ee78-4215-9877-e8f6bae62fb7',
  name: 'Djaci Martins Bezerra',
  type: UNKNOWN_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-06T19:00:18.713Z'),
  updated_at: new Date('2025-03-06T19:00:18.713Z'),
  deleted_at: null,
});

export const DONA_DE_CASA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '7942307d-6cb8-451d-b566-768eef7941d2',
  name: 'Dona de Casa',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-07T19:00:18.713Z'),
  updated_at: new Date('2025-03-07T19:00:18.713Z'),
  deleted_at: null,
});

export const DROGARIA_BRASIL_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '743666a9-a16a-44c9-8776-764f1a00d59c',
  name: 'Drogaria Brasil',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-20T19:00:18.713Z'),
  updated_at: new Date('2025-03-20T19:00:18.713Z'),
  deleted_at: null,
});

export const DROGARIA_PACHECO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '1781d932-aaf8-4c8d-be3b-db23ffa602c7',
  name: 'Drogaria Pacheco',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-09T19:00:18.713Z'),
  updated_at: new Date('2025-03-09T19:00:18.713Z'),
  deleted_at: null,
});

export const DUNKIN_DONUTS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '002386e1-cec9-4820-8a6b-adeb55123a94',
  name: 'Dunkin Donuts',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-11T19:00:18.713Z'),
  updated_at: new Date('2025-03-11T19:00:18.713Z'),
  deleted_at: null,
});

export const ECOPISTA_FPAY_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'e24d13b6-cfdb-49a9-b7c5-f6e407921c59',
  name: 'Ecopista FPay',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-12T19:00:18.713Z'),
  updated_at: new Date('2025-03-12T19:00:18.713Z'),
  deleted_at: null,
  description: 'São Paulo'
});

export const ESPETINHO_ELENA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '8874eaa4-a45c-4c0c-9fe8-72932e93b884',
  name: 'Espetinho Elena',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-13T19:00:18.713Z'),
  updated_at: new Date('2025-03-13T19:00:18.713Z'),
  deleted_at: null,
});

export const ESTACIONAMENTO_BRASILIA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '61119323-68f1-447e-a5a1-1ed916361a2a',
  name: 'Estacionamento Brasilia',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-14T19:00:18.713Z'),
  updated_at: new Date('2025-03-14T19:00:18.713Z'),
  deleted_at: null,
});

export const ETS_PIZZARIA_EXPRESS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '8ef51331-402a-4e6c-9819-1d12369e1c07',
  name: 'ets pizzaria express',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-15T19:00:18.713Z'),
  updated_at: new Date('2025-03-15T19:00:18.713Z'),
  deleted_at: null,
});

export const GAMBAR_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '929d378d-dd10-4909-91ee-d0a4e7d1decc',
  name: 'Gambar',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-16T19:00:18.713Z'),
  updated_at: new Date('2025-03-16T19:00:18.713Z'),
  deleted_at: null,
});

export const GUARAREMA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '1741bb52-c2bc-49ef-a454-f10ffbb7e33f',
  name: 'Guararema',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-17T19:00:18.713Z'),
  updated_at: new Date('2025-03-17T19:00:18.713Z'),
  deleted_at: null,
  description: 'São Paulo'
});

export const ITAQUACETUBA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'f48d1b0e-5a90-4dc4-8bc8-159df8e85ba3',
  name: 'Itaquacetuba',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-18T19:00:18.713Z'),
  updated_at: new Date('2025-03-18T19:00:18.713Z'),
  deleted_at: null,
  description: 'São Paulo'
});

export const KINOPLEX_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'ad5eeb73-4ac4-43e8-bbbc-4b1b3b3c24cf',
  name: 'kinoplex',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-19T19:00:18.713Z'),
  updated_at: new Date('2025-03-19T19:00:18.713Z'),
  deleted_at: null,
});

export const LEVVO_DF_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '7e7b323a-9e16-4037-8109-7434f31aeb30',
  name: 'levvo DF',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-20T19:00:18.713Z'),
  updated_at: new Date('2025-03-20T19:00:18.713Z'),
  deleted_at: null,
});

export const LOJAS_MILANO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '3376fe74-883d-42a6-bec9-a4295fef2a11',
  name: 'Lojas Milano',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-21T19:00:18.713Z'),
  updated_at: new Date('2025-03-21T19:00:18.713Z'),
  deleted_at: null,
});

export const MADERO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '37db49a6-2739-4117-ab73-554824eb4bec',
  name: 'Madero',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-22T19:00:18.713Z'),
  updated_at: new Date('2025-03-22T19:00:18.713Z'),
  deleted_at: null,
});

export const MB_PARKING_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '6bba502b-f4f4-4dcd-8b58-362018792cf9',
  name: 'Mb Parking',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-23T19:00:18.713Z'),
  updated_at: new Date('2025-03-23T19:00:18.713Z'),
  deleted_at: null,
});

export const MOTIVA_IMOVEIS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'ffea2ab4-32cc-4a4e-b3f7-f7c9e45c9ef7',
  name: 'Motiva Imóveis',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-24T19:00:18.713Z'),
  updated_at: new Date('2025-03-24T19:00:18.713Z'),
  deleted_at: null,
  description: 'São Paulo'
});

export const NETSHOP_INFORMATICA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'bbff1c86-7976-4dc8-9f6b-9e48c27316e0',
  name: 'NetShop Informatica',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-25T19:00:18.713Z'),
  updated_at: new Date('2025-03-25T19:00:18.713Z'),
  deleted_at: null,
});

export const NOVA_RDE_EXPRESS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'a4e1982d-a54c-4e16-8820-d9fea4df184c',
  name: 'Nova Rde Express',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-26T19:00:18.713Z'),
  updated_at: new Date('2025-03-26T19:00:18.713Z'),
  deleted_at: null,
});

export const O_BADEN_BADEN_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'cc5b4086-8ecd-4066-9b1b-abf3a06292ac',
  name: 'O baden Baden',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-27T19:00:18.713Z'),
  updated_at: new Date('2025-03-27T19:00:18.713Z'),
  deleted_at: null,
});

export const PAO_DE_ACUCAR_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '0756f0b2-c689-4501-b5b0-da133fdd1e75',
  name: 'Pão de Açucar',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-29T19:00:18.713Z'),
  updated_at: new Date('2025-03-29T19:00:18.713Z'),
  deleted_at: null,
});

export const PAYGO_DIVINO_LANCHE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '542ab0af-33b6-4d47-b507-4c55f86e11bf',
  name: 'paygo Divino Lanche',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-30T19:00:18.713Z'),
  updated_at: new Date('2025-03-30T19:00:18.713Z'),
  deleted_at: null,
});

export const PETZ_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '146485c5-5891-4ed7-a54a-9e6cc421d052',
  name: 'Petz',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-03-31T19:00:18.713Z'),
  updated_at: new Date('2025-03-31T19:00:18.713Z'),
  deleted_at: null,
});

export const PG_TON_ANESIA_MARTINS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '18b4cbd9-83f3-404d-a66a-8e4736a55248',
  name: 'PG TON ANESIA MARTINS',
  type: UNKNOWN_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-01T19:00:18.713Z'),
  updated_at: new Date('2025-04-01T19:00:18.713Z'),
  deleted_at: null,
});

export const PLAYTIME_COMBUSTIVEL_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '1aa24de1-376c-4b08-942b-b454792b183b',
  name: 'Playtime Combustivel',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-02T19:00:18.713Z'),
  updated_at: new Date('2025-04-02T19:00:18.713Z'),
  deleted_at: null,
});

export const POSTO_SAN_REMO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '621c723d-3c96-4a56-8660-21ddd85603c9',
  name: 'Posto San Remo',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-03T19:00:18.713Z'),
  updated_at: new Date('2025-04-03T19:00:18.713Z'),
  deleted_at: null,
});

export const PRIME_GLOBAL_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'd189212b-bc6b-480e-87c7-026cfb3fcffe',
  name: 'Prime Global',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-04T19:00:18.713Z'),
  updated_at: new Date('2025-04-04T19:00:18.713Z'),
  deleted_at: null,
});

export const ROTA_DE_CASA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'bdf4c523-85e4-4d00-8d19-fa27639f2d01',
  name: 'Rota de Casa',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-05T19:00:18.713Z'),
  updated_at: new Date('2025-04-05T19:00:18.713Z'),
  deleted_at: null,
});

export const SANS_SOUCI_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '17105356-efb7-415a-a395-d682ab133078',
  name: 'Sans Souci',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-06T19:00:18.713Z'),
  updated_at: new Date('2025-04-06T19:00:18.713Z'),
  deleted_at: null,
});

export const SAO_JOSE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'ae3040f3-2cfc-4ae1-900f-798fae6dbfd1',
  name: 'São Jose',
  type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-07T19:00:18.713Z'),
  updated_at: new Date('2025-04-07T19:00:18.713Z'),
  deleted_at: null,
  description: 'São Paulo'
});

export const SENHORA_BAFORADA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '43ba85c6-22f3-452c-8230-94d61f479088',
  name: 'Senhora Baforada',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-08T19:00:18.713Z'),
  updated_at: new Date('2025-04-08T19:00:18.713Z'),
  deleted_at: null,
});

export const SPOLETO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '6c30ea1e-d25b-4a15-9b36-71d62923286d',
  name: 'Spoleto',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-09T19:00:18.713Z'),
  updated_at: new Date('2025-04-09T19:00:18.713Z'),
  deleted_at: null,
});

export const STARBUCKS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '061b7660-d903-42ce-842f-495570f542d9',
  name: 'Starbucks',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-10T19:00:18.713Z'),
  updated_at: new Date('2025-04-10T19:00:18.713Z'),
  deleted_at: null,
});

export const SUSHILOKO_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '52bb870c-d770-4bba-9f0b-95a6c0a1bf15',
  name: 'Sushiloko',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-11T19:00:18.713Z'),
  updated_at: new Date('2025-04-11T19:00:18.713Z'),
  deleted_at: null,
});

export const VERO_TRATORIA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '548f23ab-d9a9-4973-a7d9-75e5ba91261e',
  name: 'Vero Tratoria',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-12T19:00:18.713Z'),
  updated_at: new Date('2025-04-12T19:00:18.713Z'),
  deleted_at: null,
});

export const CHINA_IN_BOX_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'be5d84f8-7437-4135-9d3a-f5c6b779984d',
  name: 'China in Box',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-13T19:00:18.713Z'),
  updated_at: new Date('2025-04-13T19:00:18.713Z'),
  deleted_at: null,
});

export const URBAN_CAPACETE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '3a75f71f-1ed6-400c-b9f3-5c53d14617bf',
  name: 'Urban Capacete',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-14T19:00:18.713Z'),
  updated_at: new Date('2025-04-14T19:00:18.713Z'),
  deleted_at: null,
});

export const IFOOD_CLUB_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '46c0cecf-e435-416c-b7c0-e54235809f97',
  name: 'IFood Clube',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-15T19:00:18.713Z'),
  updated_at: new Date('2025-04-15T19:00:18.713Z'),
  deleted_at: null,
});

export const ANJOS_RESTAURANTE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '46c0cecf-e435-416c-b7c0-e54235809f97',
  name: 'Anjos Restaurante',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-16T19:00:18.713Z'),
  updated_at: new Date('2025-04-16T19:00:18.713Z'),
  deleted_at: null,
});

export const ANDRE_VINICIOS_PEREIRA_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '858836e2-5ada-4b2d-98e0-cadf6ef2ad3b',
  name: 'Anjos Restaurante',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-17T19:00:18.713Z'),
  updated_at: new Date('2025-04-17T19:00:18.713Z'),
  deleted_at: null,
});

export const IFOOD_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '50709e48-4d61-46bf-b75a-e58fce78aa78',
  name: 'Ifood',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-18T19:00:18.713Z'),
  updated_at: new Date('2025-04-18T19:00:18.713Z'),
  deleted_at: null,
});

export const GOOGLE_ONE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '2f22c6c6-d120-4f6c-a714-8d8865869ad7',
  name: 'Google One',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-19T19:00:18.713Z'),
  updated_at: new Date('2025-04-19T19:00:18.713Z'),
  deleted_at: null,
});

export const PIZZARIA_DOIS_IRMAOS_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '64b46939-13a6-491d-b396-ae17405ae4da',
  name: 'Pizzaria dois irmãos',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-20T19:00:18.713Z'),
  updated_at: new Date('2025-04-20T19:00:18.713Z'),
  deleted_at: null,
});

export const XIQUE_XIQUE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '4a74eaaa-7875-48d6-b1c8-ac409decc4b7',
  name: 'Xique Xique',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-21T19:00:18.713Z'),
  updated_at: new Date('2025-04-21T19:00:18.713Z'),
  deleted_at: null,
});

export const MELIMAIS_MERCADO_LIVRE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '7625a0f9-564e-450b-ae19-de1a0e286919',
  name: 'MeliMais Mercado Livre',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-22T19:00:18.713Z'),
  updated_at: new Date('2025-04-22T19:00:18.713Z'),
  deleted_at: null,
});

export const MERCADO_LIVRE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'ee94630e-e831-4300-bb9f-06d0b8ee7b35',
  name: 'Mercado Livre',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-23T19:00:18.713Z'),
  updated_at: new Date('2025-04-23T19:00:18.713Z'),
  deleted_at: null,
});

export const NETFLIX_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '19bf69e2-f820-4d28-90d0-e52295f7a864',
  name: 'Netflix',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-24T19:00:18.713Z'),
  updated_at: new Date('2025-04-24T19:00:18.713Z'),
  deleted_at: null,
});

export const HBO_MAX_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '496261ac-1184-4ca1-88c5-dfe04e2726ea',
  name: 'HBO Max',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-25T19:00:18.713Z'),
  updated_at: new Date('2025-04-25T19:00:18.713Z'),
  deleted_at: null,
});

export const AMAZON_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '2ce1289c-4d64-40f5-85dc-4bb7516bd641',
  name: 'Amazon',
  type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-26T19:00:18.713Z'),
  updated_at: new Date('2025-04-26T19:00:18.713Z'),
  deleted_at: null,
});

export const CREDIT_CARD_ANNUAL_FEE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'ee745ff6-a158-4120-a4a3-e33e4c8c592a',
  name: 'Credit Card Annual Fee',
  type: BILLS_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-26T19:00:18.713Z'),
  updated_at: new Date('2025-04-26T19:00:18.713Z'),
  deleted_at: null,
});

export const CREDIT_CARD_LOSS_AND_THEFT_PROTECTION_SERVICE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '09594813-016a-4138-b2bc-8ec674ec1ba6',
  name: 'Credit Card Loss And Theft Protection Service',
  type: BILLS_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-26T19:00:18.713Z'),
  updated_at: new Date('2025-04-26T19:00:18.713Z'),
  deleted_at: null,
});

export const CREDIT_CARD_ADDITIONAL_IOF_ON_FINANCED_BALANCE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: 'b6b33b0c-0066-44ec-9493-487a376a7e46',
  name: 'Credit Card IOF On Financed Balance',
  type: BILLS_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-26T19:00:18.713Z'),
  updated_at: new Date('2025-04-26T19:00:18.713Z'),
  deleted_at: null,
});

export const CREDIT_CARD_PREVIOUS_INVOICE_BALANCE_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '327a0d12-4e12-4b0d-b7a2-1a60bbdf7070',
  name: 'Credit Card Previous Invoice Balance',
  type: BILLS_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-26T19:00:18.713Z'),
  updated_at: new Date('2025-04-26T19:00:18.713Z'),
  deleted_at: null,
});

export const CREDIT_CARD_CHARGES_SUPPLIER_FIXTURE: Supplier = new Supplier({
  id: '91011d63-d763-4ce9-a050-978182a06166',
  name: 'Credit Card Previous Invoice Balance',
  type: BILLS_SUPPLIER_TYPE_FIXTURE,
  active: true,
  created_at: new Date('2025-04-26T19:00:18.713Z'),
  updated_at: new Date('2025-04-26T19:00:18.713Z'),
  deleted_at: null,
});

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
  CAIXA_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE,
  OLD_BIKERS_TRANSPORT_SUPPLIER_FIXTURE,
  ANCAR_GESTAO_DE_EMP_SUPPLIER_FIXTURE,
  APACHE_SUPPLIER_FIXTURE,
  ATACADAO_DIA_A_DIA_SUPPLIER_FIXTURE,
  BAR_DO_JAPA_SUPPLIER_FIXTURE,
  BARUC_RESTAURANT_SUPPLIER_FIXTURE,
  BG_NORTE_PETROLEO_SUPPLIER_FIXTURE,
  BRASCANSTHRP_SUPPLIER_FIXTURE,
  BROSSMAN_SUPPLIER_FIXTURE,
  CADEIRA_DESIGN_SUPPLIER_FIXTURE,
  CAIOCESARROCHAMEN_SUPPLIER_FIXTURE,
  CASCOL_COMBUSTIVEIS_SUPPLIER_FIXTURE,
  CASTELO_CAMPOS_DO_JORDAO_SUPPLIER_FIXTURE,
  CONDOMINIO_CIVIL_BRASIL_SUPPLIER_FIXTURE,
  CONFIANCE_GESTAO_CONDO_SUPPLIER_FIXTURE,
  CONFRARIA_DA_BARBA_SUPPLIER_FIXTURE,
  DAISO_SUPPLIER_FIXTURE,
  DJACI_MARTINS_BEZERRA_SUPPLIER_FIXTURE,
  DONA_DE_CASA_SUPPLIER_FIXTURE,
  DROGARIA_BRASIL_SUPPLIER_FIXTURE,
  DROGARIA_PACHECO_SUPPLIER_FIXTURE,
  DUNKIN_DONUTS_SUPPLIER_FIXTURE,
  ECOPISTA_FPAY_SUPPLIER_FIXTURE,
  ESPETINHO_ELENA_SUPPLIER_FIXTURE,
  ESTACIONAMENTO_BRASILIA_SUPPLIER_FIXTURE,
  ETS_PIZZARIA_EXPRESS_SUPPLIER_FIXTURE,
  GAMBAR_SUPPLIER_FIXTURE,
  GUARAREMA_SUPPLIER_FIXTURE,
  ITAQUACETUBA_SUPPLIER_FIXTURE,
  KINOPLEX_SUPPLIER_FIXTURE,
  LEVVO_DF_SUPPLIER_FIXTURE,
  LOJAS_MILANO_SUPPLIER_FIXTURE,
  MADERO_SUPPLIER_FIXTURE,
  MB_PARKING_SUPPLIER_FIXTURE,
  MOTIVA_IMOVEIS_SUPPLIER_FIXTURE,
  NETSHOP_INFORMATICA_SUPPLIER_FIXTURE,
  NOVA_RDE_EXPRESS_SUPPLIER_FIXTURE,
  O_BADEN_BADEN_SUPPLIER_FIXTURE,
  PAO_DE_ACUCAR_SUPPLIER_FIXTURE,
  PAYGO_DIVINO_LANCHE_SUPPLIER_FIXTURE,
  PETZ_SUPPLIER_FIXTURE,
  PG_TON_ANESIA_MARTINS_SUPPLIER_FIXTURE,
  PLAYTIME_COMBUSTIVEL_SUPPLIER_FIXTURE,
  POSTO_SAN_REMO_SUPPLIER_FIXTURE,
  PRIME_GLOBAL_SUPPLIER_FIXTURE,
  ROTA_DE_CASA_SUPPLIER_FIXTURE,
  SANS_SOUCI_SUPPLIER_FIXTURE,
  SAO_JOSE_SUPPLIER_FIXTURE,
  SENHORA_BAFORADA_SUPPLIER_FIXTURE,
  SPOLETO_SUPPLIER_FIXTURE,
  STARBUCKS_SUPPLIER_FIXTURE,
  SUSHILOKO_SUPPLIER_FIXTURE,
  VERO_TRATORIA_SUPPLIER_FIXTURE,
  CHINA_IN_BOX_SUPPLIER_FIXTURE,
  URBAN_CAPACETE_SUPPLIER_FIXTURE,
  IFOOD_CLUB_SUPPLIER_FIXTURE,
  ANJOS_RESTAURANTE_SUPPLIER_FIXTURE,
  ANDRE_VINICIOS_PEREIRA_SUPPLIER_FIXTURE,
  IFOOD_SUPPLIER_FIXTURE,
  GOOGLE_ONE_SUPPLIER_FIXTURE,
  PIZZARIA_DOIS_IRMAOS_SUPPLIER_FIXTURE,
  XIQUE_XIQUE_SUPPLIER_FIXTURE,
  MELIMAIS_MERCADO_LIVRE_SUPPLIER_FIXTURE,
  MERCADO_LIVRE_SUPPLIER_FIXTURE,
  NETFLIX_SUPPLIER_FIXTURE,
  HBO_MAX_SUPPLIER_FIXTURE,
  AMAZON_SUPPLIER_FIXTURE,
  CREDIT_CARD_ANNUAL_FEE_SUPPLIER_FIXTURE,
  CREDIT_CARD_LOSS_AND_THEFT_PROTECTION_SERVICE_SUPPLIER_FIXTURE,
  CREDIT_CARD_ADDITIONAL_IOF_ON_FINANCED_BALANCE_SUPPLIER_FIXTURE,
  CREDIT_CARD_PREVIOUS_INVOICE_BALANCE_SUPPLIER_FIXTURE,
  CREDIT_CARD_CHARGES_SUPPLIER_FIXTURE,
];

export const SUPPLIER_FINANCE_ENTITY: FinanceEntity = {
  id: 'SUPPLIER',
  label: 'Supplier',
  alias: 'suppliers',
  list: LIST_SUPPLIER_FIXTURE,
  type: SUPPLIER_TYPE_FINANCE_ENTITY,
};