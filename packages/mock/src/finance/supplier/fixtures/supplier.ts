import Supplier from '@repo/business/finance/supplier/supplier';
import {
    BILLS_SUPPLIER_TYPE_FIXTURE,
    HEALTH_SUPPLIER_TYPE_FIXTURE,
    HOUSING_SUPPLIER_TYPE_FIXTURE,
    TRANSPORT_SUPPLIER_TYPE_FIXTURE,
} from '../../supplier-type';

export const VIVO_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: '4dff3e08-fe12-4d95-b810-b9d70710d95d',
    name: 'Vivo',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.705Z'),
    updated_at: new Date('2025-02-11T19:00:18.705Z'),
    deleted_at: null,
    description: 'Communication Services Provider.',
});

export const CLARO_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: '5893ba7c-ec33-4bcc-af60-ba997fd9e7de',
    name: 'Claro',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.705Z'),
    updated_at: new Date('2025-02-11T19:00:18.705Z'),
    deleted_at: null,
    description: 'Communication Services Provider.',
});

export const NEOENERGIA_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: 'f4e812fe-eb68-4728-8d41-6e19dfea0e74',
    name: 'Neoenergia',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.705Z'),
    updated_at: new Date('2025-02-11T19:00:18.705Z'),
    deleted_at: null,
    description: 'Electricity Service Provider.',
});

export const IPTU_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: 'f6955c58-9e02-42b0-a70a-4467470098d7',
    name: 'IPTU',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.705Z'),
    updated_at: new Date('2025-02-11T19:00:18.705Z'),
    deleted_at: null,
    description: 'Urban Property and Territorial Tax.',
});

export const RENT_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: '3c46fb00-b744-4b70-a558-86eaf0cfc061',
    name: 'Rent',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.704Z'),
    updated_at: new Date('2025-02-11T19:00:18.704Z'),
    deleted_at: null,
    description: 'Rental Fee.',
});

export const DAY_LABORER_DIDI_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: 'ef659db9-acfa-4a03-8dfa-330727f78d74',
    name: 'Day Laborer Didi',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.705Z'),
    updated_at: new Date('2025-02-11T19:00:18.705Z'),
    deleted_at: null,
    description: 'Daily Labor Fee.',
});

export const DAY_LABORER_LUANA_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: 'd638a4cb-538e-4954-bcee-4c3d0a453478',
    name: 'Day Laborer Luana',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    description: 'Daily Labor Fee.',
    created_at: new Date('2025-02-11T19:00:18.707Z'),
    updated_at: new Date('2025-02-11T19:00:18.707Z'),
    deleted_at: null,
    active: true,
    
});

export const CONDOMINIUM_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: 'b0178cf7-2a0b-4fad-8e46-076b0abb930b',
    name: 'Condominium',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.713Z'),
    updated_at: new Date('2025-02-11T19:00:18.713Z'),
    deleted_at: null,
    description: 'Condominium Fee.',
});

export const GARAGE_HOUSING_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: 'c09bb2a6-9b40-4c80-96c5-0fdf3267486a',
    name: 'Garage',
    type: HOUSING_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.724Z'),
    updated_at: new Date('2025-02-11T19:00:18.724Z'),
    deleted_at: null,
    description: 'Garage Rental Fee.',
});

export const UNIMED_HEALTH_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: 'd7129143-ca24-45eb-acc3-f4f7bdec909b',
    name: 'Unimed',
    type: HEALTH_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.722Z'),
    updated_at: new Date('2025-02-11T19:00:18.722Z'),
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
    created_at: new Date('2025-02-11T19:00:18.712Z'),
    updated_at: new Date('2025-02-11T19:00:18.712Z'),
    deleted_at: null,
    description: 'Licensing Fee.',
});

export const CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: '76baa64b-5a15-44a6-9c18-8bff59a9e5f7',
    name: 'Car Insurance',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.713Z'),
    updated_at: new Date('2025-02-11T19:00:18.713Z'),
    deleted_at: null,
    description: 'Car Insurance Monthly Fee.',
});

export const NUBANK_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: '50d9ad0e-5833-4bf4-978e-c54ef1dcc8a2',
    name: 'Nubank',
    type: BILLS_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.713Z'),
    updated_at: new Date('2025-02-11T19:00:18.713Z'),
    deleted_at: null,
    description: 'Credit card Monthly Fee.',
});

export const PORTO_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: '3658a6bd-2fa4-4b11-93d8-25ae8d63500e',
    name: 'Porto',
    type: BILLS_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.713Z'),
    updated_at: new Date('2025-02-11T19:00:18.713Z'),
    deleted_at: null,
    description: 'Credit card Monthly Fee.',
});

export const OLD_BIKERS_TRANSPORT_SUPPLIER_FIXTURE: Supplier = new Supplier({
    id: '1781d932-aaf8-4c8d-be3b-db23ffa602c7',
    name: 'Old Bikers',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
    active: true,
    created_at: new Date('2025-02-11T19:00:18.713Z'),
    updated_at: new Date('2025-02-11T19:00:18.713Z'),
    deleted_at: null,
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