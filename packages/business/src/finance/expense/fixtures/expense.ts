import { findEntityBy } from '@repo/services/entities/entities';

import Expense from '../expense';

import EXPENSE_LIST_FIXTURE_JSON from '@repo/mock-json/finance/expense/expenses.json';

const EXPENSE_LIST_TEMP: Array<Expense> = EXPENSE_LIST_FIXTURE_JSON.map(
  (expense) => expense as unknown as Expense,
);

const EXPENSES_CONFIG = {
  INGRID_RESIDENTIAL: [
    {
      id: '41b0ef6f-0b6e-4633-94d9-14680010a0e2',
      name: 'ELECTRICITY_BILL',
    },
    {
      id: 'aec02e53-f5d9-4696-b69b-2d0c5722df37',
      name: 'URBAN_PROPERTY_LAND_TAX',
    },
    {
      id: 'ea6c92a1-e799-4b4b-8187-27a7a8cca072',
      name: 'INTERNET_TELEPHONE_FEE',
    },
    {
      id: 'cb6fde6e-7b96-410a-b6dc-761e79d260d0',
      name: 'DAY_LABORER',
    },
    {
      id: 'ee9f872d-2a29-4e5b-be26-32c7e3b6bff5',
      name: 'CONDOMINIUM',
    },
    {
      id: 'ec46eebc-d7b3-4b0e-86ab-2aa8a57ddb7c',
      name: 'GARAGE_HOUSING',
    },
    {
      id: '92074567-da2b-4104-88ec-4b631e71ac21',
      name: 'HOUSING_RENT',
    },
  ],
  MONTE_CARLO_RESIDENTIAL: [
    {
      id: 'cab6cfd0-516f-4d20-8fae-db0f3fe487c6',
      name: 'ELECTRICITY_BILL',
    },
    {
      id: '42eb3d0f-9710-4b4a-9f88-bba591e93a7f',
      name: 'URBAN_PROPERTY_LAND_TAX',
    },
    {
      id: 'c9120b19-3779-43c6-aa68-4974cca110c3',
      name: 'INTERNET_TELEPHONE_FEE',
    },
    {
      id: '586e89d9-a7bf-446c-b23f-5b46723447c9',
      name: 'DAY_LABORER',
    },
    {
      id: 'b86d2840-5270-48b5-8914-d53b2eb47fd0',
      name: 'CONDOMINIUM',
    },
    {
      id: '4e90a68c-4db7-42c3-820a-ca5423e9959c',
      name: 'GARAGE_HOUSING',
    },
  ],
  MOTHER: [
    {
      id: '820fbc50-b03d-4f4b-acc2-6731326d4a53',
      name: 'UNIMED_HEALTH',
    },
    {
      id: '3bc98b1f-fe87-48b1-be9e-fc1b32be255e',
      name: 'MOTOR_VEHICLE_PROPERTY_TAX',
    },
    {
      id: '721e08f7-31c9-49da-9b92-9d9692b360a7',
      name: 'LICENSING_CAR',
    },
    {
      id: '468f7833-3e38-4fb5-9c1d-b564e303b23a',
      name: 'CAR_INSURANCE',
    },
    {
      id: '90439af0-99d3-4b2f-9968-830317ba7240',
      name: 'CAIXA_CREDIT_CARD',
    },
    {
      id: 'd79d1d53-ca31-41fb-aef3-2adcc3854a93',
      name: 'NUBANK_CREDIT_CARD',
    },
  ],
  PERSONAL: [
    {
      id: '892deb09-b435-436f-a1aa-cca919a35482',
      name: 'MOTOR_VEHICLE_PROPERTY_TAX',
    },
    {
      id: '9e551119-4846-40a3-8cd0-a539fd1db4e6',
      name: 'LICENSING_CAR',
    },
    {
      id: '468f7833-3e38-4fb5-9c1d-b564e303b23a',
      name: 'CAR_INSURANCE',
    },
    {
      id: '95132d41-29b6-46ea-b736-662ab5b55007',
      name: 'MASONIC_LODGE',
    },
    {
      id: 'ca1febaf-3338-4705-8360-5662f7a39dd4',
      name: 'PHILOSOPHICAL_MASONIC_LODGE',
    },
    {
      id: '30e2f747-6d5e-41d3-9a41-b3d102684ef4',
      name: 'MOTORCYCLE_CLUB',
    },
    {
      id: '0ba093b0-22ab-444d-8a2a-41f414a8212d',
      name: 'AMAZON_NUBANK_CREDIT_CARD',
    },
    {
      id: '0e49cb9a-ded0-40e5-8a1d-c36bd9956c52',
      name: 'CHINA_IN_BOX_NUBANK_CREDIT_CARD',
    },
    {
      id: '2c4213af-bd6f-446a-b64e-5d7f7e9580a8',
      name: 'PAO_DE_ACUCAR_DIGITAL_WALLET_NUBANK_CREDIT_CARD',
    },
    {
      id: '5a68bd46-b83c-49b5-afd5-861023fd3c4d',
      name: 'IFOOD_CLUB_IFOOD_NUBANK_CREDIT_CARD',
    },
    {
      id: 'c386d99f-6302-4476-9655-350f938abe1b',
      name: 'ANJOS_RESTAURANTE_IFOOD_NUBANK_CREDIT_CARD',
    },
    {
      id: '40d579b7-65c7-4cdb-8bd2-847db1909797',
      name: 'ANDRE_VINICIOS_PEREIRA_IFOOD_NUBANK_CREDIT_CARD',
    },
    {
      id: '23d53824-5917-4f8c-93c7-2f4ca59719e8',
      name: 'IFOOD_IFOOD_NUBANK_CREDIT_CARD',
    },
    {
      id: '5ec798c7-e630-4b04-a962-3ac68ab8116d',
      name: 'GOOGLE_ONE_IFOOD_NUBANK_CREDIT_CARD',
    },
    {
      id: 'bf73be3b-65a3-44c9-b08a-44c901982af7',
      name: 'PIZZARIA_DOIS_IRMAOS_IFOOD_NUBANK_CREDIT_CARD',
    },
    {
      id: 'b599ce5e-32fe-45c8-a62a-40b9e55eee67',
      name: 'XIQUE_XIQUE_IFOOD_NUBANK_CREDIT_CARD',
    },
    {
      id: '438945be-4677-417c-89c3-2676f448a088',
      name: 'MELIMAIS_MERCADO_LIVRE_NUBANK_CREDIT_CARD',
    },
    {
      id: '3d457d26-a059-474c-b111-c5160a104aae',
      name: 'MERCADO_LIVRE_NUBANK_CREDIT_CARD',
    },
    {
      id: '71b187c8-5d21-46b9-954e-bb9547d5eeab',
      name: 'NETFLIX_STREAMING_NUBANK_CREDIT_CARD',
    },
    {
      id: '2c984b43-87f8-40f9-901c-6c02e941740d',
      name: 'HBO_MAX_STREAMING_NUBANK_CREDIT_CARD',
    },
    {
      id: '8805b893-83d0-459d-bce3-8fd50a0577b6',
      name: 'URBAN_CAPACETE_VIRTUAL_24H_NUBANK_CREDIT_CARD',
    },
    {
      id: '6c87d5de-d652-442c-a7b0-e89ee9d3a7b5',
      name: 'CAR_INSURANCE_PORTO_CREDIT_CARD',
    },
    {
      id: 'f9244ce5-f7e4-410a-b840-6000f3e0cd2e',
      name: 'CREDIT_CARD_ANNUAL_FEE_PORTO_CREDIT_CARD',
    },
    {
      id: 'e8ff59cb-6702-43f3-9a08-1f1c68324eac',
      name: 'CREDIT_CARD_LOSS_AND_THEFT_PROTECTION_SERVICE_PORTO_CREDIT_CARD',
    },
    {
      id: '92e94d1d-1703-46bc-a591-22746dfefb1e',
      name: 'CREDIT_CARD_ADDITIONAL_IOF_ON_FINANCED_BALANCE_PORTO_CREDIT_CARD',
    },
    {
      id: '06091107-7101-4733-bdd2-c018a9864710',
      name: 'CREDIT_CARD_PREVIOUS_INVOICE_BALANCE_PORTO_CREDIT_CARD',
    },
    {
      id: '13bf9dba-e9e1-4bd9-8d89-2890e51b429d',
      name: 'CREDIT_CARD_CHARGES_PORTO_CREDIT_CARD',
    },
    {
      id: '7d325b0a-1d37-4cb1-8530-9e94547e018b',
      name: 'ANCAR_GESTAO_DE_EMP_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },
    {
      id: '7ee78661-f79a-420e-8e0b-f42ee2d3d241',
      name: 'APACHE_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '77e35205-34f4-4513-b024-626fda8c6b59',
      name: 'ATACADAO_DIA_A_DIA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '41a1bba4-17f0-42f9-9cfd-c678529be904',
      name: 'BAR_DO_JAPA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '0f3120b4-a092-48b5-905d-9779e43e1926',
      name: 'BARUC_RESTAURANT_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '4d564283-c8d7-45ba-ab90-55610a20f080',
      name: 'BG_NORTE_PETROLEO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'b76847ee-8ccc-44e0-9d22-047c404ef6d0',
      name: 'BRASCANSTHRP_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '060a9f68-a301-4b36-9012-d7755515337a',
      name: 'BROSSMAN_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'd38b0d35-46ac-4a66-b019-b4c6dcca1873',
      name: 'CADEIRA_DESIGN_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'a309dac1-7b9a-4de1-bf76-b4a0e4911dad',
      name: 'CAIOCESARROCHAMEN_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'b8a154d9-6b0b-4875-a8f5-b963caabd921',
      name: 'CASCOL_COMBUSTIVEIS_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'faaeda8a-3149-4870-8ab1-702f574645ad',
      name: 'CASTELO_CAMPOS_DO_JORDAO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'ed2472da-b0d1-402b-82e6-f8fdff982fd5',
      name: 'CONDOMINIO_CIVIL_BRASIL_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'fc9815f3-7c1b-4741-aa2a-c636694abb35',
      name: 'CONFIANCE_GESTAO_CONDO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '758d75bc-1b62-4251-9aa7-d607afc5bf07',
      name: 'CONFRARIA_DA_BARBA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'a3885717-66d9-4b1a-a45e-a60769d4a9c0',
      name: 'DAISO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '14a4464b-cd40-4601-bc75-fc1c2b333d98',
      name: 'DJACI_MARTINS_BEZERRA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'fa939077-f43a-410f-9666-5a63402ad1f3',
      name: 'DONA_DE_CASA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '0f76c96f-115b-4788-8317-fca3d9257839',
      name: 'DROGARIA_BRASIL_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'dd730bea-77d8-4fc7-b757-a40f1cb8d75e',
      name: 'DROGARIA_PACHECO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'a74a0674-cb23-4bcd-bc67-92d3fd790f5a',
      name: 'DUNKIN_DONUTS_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '3449b2da-1660-4196-8a2a-12a57243c736',
      name: 'ECOPISTA_FPAY_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '5e0464f2-f735-4ce9-934c-5e5af961f20b',
      name: 'ESPETINHO_ELENA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'a57987ab-dd06-4102-9c03-557610199908',
      name: 'ESTACIONAMENTO_BRASILIA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '13b03b82-ce85-43ce-9b1b-c7c11435f3f4',
      name: 'ETS_PIZZARIA_EXPRESS_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '4171e714-01aa-452d-89a0-29ac844ec54e',
      name: 'GAMBAR_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '0acdd20d-63f1-41d3-ba0b-85670ad68133',
      name: 'GUARAREMA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '2bbf3edf-d0d4-4b1b-9e19-83bcb880520c',
      name: 'ITAQUACETUBA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '4aca615c-af10-4197-8908-9ddd48f47682',
      name: 'KINOPLEX_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '9a021bcd-b626-43d7-8d08-b59706fce692',
      name: 'LEVVO_DF_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '0a225cdb-be0c-4e0f-82a4-ab0e27c61ce7',
      name: 'LOJAS_MILANO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'd2e79cd7-5db2-4e51-bd4f-7877612aa2f0',
      name: 'MADERO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'f6e20a86-31f4-473a-9f76-d35004b480d5',
      name: 'MB_PARKING_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '9f3f3a86-699d-471e-9aa3-2bbb63515122',
      name: 'MOTIVA_IMOVEIS_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '8af9f67d-144f-41a9-884f-abda9268856f',
      name: 'NETSHOP_INFORMATICA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'c6da0e50-5e63-4452-94a8-9212b3d93f2a',
      name: 'NOVA_RDE_EXPRESS_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '8ed5546e-867e-4ac7-983b-6991fc493f11',
      name: 'O_BADEN_BADEN_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'ec04d9e9-1edf-40f0-b93d-9353c45866d9',
      name: 'OLD_BIKERS_TRANSPORT_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '328a09de-bf4e-4b2c-a6a7-f646a723ebbf',
      name: 'PAO_DE_ACUCAR_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '245d5c62-b92d-442c-83c5-487d00b29d44',
      name: 'PAYGO_DIVINO_LANCHE_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '55b3feb0-cc6b-4bf7-9653-b170bbfc6dc5',
      name: 'PETZ_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'dd282810-5a5e-42cd-83c8-cb0ad7710c43',
      name: 'PG_TON_ANESIA_MARTINS_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'b9e4fea6-0995-4e0e-bf5c-ece8e0306dac',
      name: 'PLAYTIME_COMBUSTIVEL_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '7c41e782-2482-44e7-bb88-66ef251b0975',
      name: 'POSTO_SAN_REMO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'e83702f4-0696-420b-a7c0-d2adb85fbaf0',
      name: 'PRIME_GLOBAL_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '69e2909f-9768-4c04-baba-b4e0922de219',
      name: 'ROTA_DE_CASA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'fd01f81b-35d4-4762-8ac3-adc7c9825134',
      name: 'SANS_SOUCI_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '7dc78b42-32ab-4c30-a740-9fdd4ea43718',
      name: 'SAO_JOSE_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'df0ebe25-5768-45d0-9d12-cfa4f43f804a',
      name: 'SENHORA_BAFORADA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '457b2178-5315-4fd0-9f2a-e727af9301c1',
      name: 'SPOLETO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'c12deb09-00d7-4d59-a118-52bb8d0107ff',
      name: 'STARBUCKS_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: 'b99f4cda-20f7-41fe-aebd-ee52dcc6b384',
      name: 'SUSHILOKO_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },

    {
      id: '86869d4d-d1e2-474a-a676-2cf86644a9dc',
      name: 'VERO_TRATORIA_PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE',
    },
  ],
};

function generateExpenseFixtures(
  config: Record<string, Array<{ id: string; name: string }>>,
) {
  const fixtures: Record<string, any> = {};

  Object.entries(config).forEach(([category, expenses]) => {
    const listFixtureKey = `${category}_LIST_FIXTURE`;
    fixtures[listFixtureKey] = expenses.map((expense) => {
      const fixtureName = `${expense.name}_${category}_EXPENSE_FIXTURE`;
      fixtures[fixtureName] = findEntityBy({
        key: 'id',
        value: expense.id,
        list: EXPENSE_LIST_TEMP,
      });
      return fixtures[fixtureName];
    });
  });

  return fixtures;
}

const fixtures = generateExpenseFixtures(EXPENSES_CONFIG);
const INGRID_RESIDENTIAL_LIST_FIXTURE =
  fixtures['INGRID_RESIDENTIAL_LIST_FIXTURE'];
const MONTE_CARLO_RESIDENTIAL_LIST_FIXTURE =
  fixtures['MONTE_CARLO_RESIDENTIAL_LIST_FIXTURE'];
const MOTHER_LIST_FIXTURE = fixtures['MOTHER_LIST_FIXTURE'];
const PERSONAL_LIST_FIXTURE = fixtures['PERSONAL_LIST_FIXTURE'];
const EXPENSE_LIST_FIXTURE: Array<Expense> = EXPENSE_LIST_TEMP;
export {
  INGRID_RESIDENTIAL_LIST_FIXTURE,
  MONTE_CARLO_RESIDENTIAL_LIST_FIXTURE,
  MOTHER_LIST_FIXTURE,
  PERSONAL_LIST_FIXTURE,
  EXPENSE_LIST_FIXTURE,
};