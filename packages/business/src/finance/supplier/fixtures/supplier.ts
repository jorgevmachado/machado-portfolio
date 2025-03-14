import { findEntityBy } from '@repo/services/entities/entities';
import Supplier from '../supplier';

import SUPPLIER_LIST_FIXTURE_JSON from './suppliers.json';

const SUPPLIER_LIST_TEMP: Array<Supplier> = SUPPLIER_LIST_FIXTURE_JSON.map(
  (supplier) => supplier as unknown as Supplier,
);

export const VIVO_HOUSING_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Vivo',
  list: SUPPLIER_LIST_TEMP,
});

export const CLARO_HOUSING_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Claro',
  list: SUPPLIER_LIST_TEMP,
});

export const NEOENERGIA_HOUSING_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Neoenergia',
  list: SUPPLIER_LIST_TEMP,
});

export const IPTU_HOUSING_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'IPTU',
  list: SUPPLIER_LIST_TEMP,
});

export const RENT_HOUSING_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Rent',
  list: SUPPLIER_LIST_TEMP,
});

export const DAY_LABORER_DIDI_HOUSING_SUPPLIER_FIXTURE: Supplier = findEntityBy(
  {
    key: 'name',
    value: 'Day Laborer Didi',
    list: SUPPLIER_LIST_TEMP,
  },
);

export const DAY_LABORER_LUANA_HOUSING_SUPPLIER_FIXTURE: Supplier =
  findEntityBy({
    key: 'name',
    value: 'Day Laborer Luana',
    list: SUPPLIER_LIST_TEMP,
  });

export const CONDOMINIUM_HOUSING_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Condominium',
  list: SUPPLIER_LIST_TEMP,
});

export const GARAGE_HOUSING_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Garage',
  list: SUPPLIER_LIST_TEMP,
});

export const UNIMED_HEALTH_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Unimed',
  list: SUPPLIER_LIST_TEMP,
});

export const IPVA_TRANSPORT_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'IPVA',
  list: SUPPLIER_LIST_TEMP,
});

export const LICENSING_TRANSPORT_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Licensing',
  list: SUPPLIER_LIST_TEMP,
});

export const CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Car Insurance',
  list: SUPPLIER_LIST_TEMP,
});

export const NUBANK_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = findEntityBy(
  {
    key: 'name',
    value: 'Nubank',
    list: SUPPLIER_LIST_TEMP,
  },
);

export const PORTO_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Porto',
  list: SUPPLIER_LIST_TEMP,
});

export const CAIXA_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Caixa',
  list: SUPPLIER_LIST_TEMP,
});

export const OLD_BIKERS_TRANSPORT_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Old Bikers',
  list: SUPPLIER_LIST_TEMP,
});

export const ANCAR_GESTAO_DE_EMP_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Ancar Gestao de emp',
  list: SUPPLIER_LIST_TEMP,
});

export const APACHE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Apache',
  list: SUPPLIER_LIST_TEMP,
});

export const ATACADAO_DIA_A_DIA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Atacadão Dia a Dia',
  list: SUPPLIER_LIST_TEMP,
});

export const BAR_DO_JAPA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Bar do Japa',
  list: SUPPLIER_LIST_TEMP,
});

export const BARUC_RESTAURANT_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Baruc Restaurante',
  list: SUPPLIER_LIST_TEMP,
});

export const BG_NORTE_PETROLEO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Bg Norte Petroleo',
  list: SUPPLIER_LIST_TEMP,
});

export const BRASCANSTHRP_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Brascansthrp',
  list: SUPPLIER_LIST_TEMP,
});

export const BROSSMAN_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Brossman',
  list: SUPPLIER_LIST_TEMP,
});

export const CADEIRA_DESIGN_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Cadeira Design Studio',
  list: SUPPLIER_LIST_TEMP,
});

export const CAIOCESARROCHAMEN_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Caiocesarrochamen',
  list: SUPPLIER_LIST_TEMP,
});

export const CASCOL_COMBUSTIVEIS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Cascol Combustiveis',
  list: SUPPLIER_LIST_TEMP,
});

export const CASTELO_CAMPOS_DO_JORDAO_SUPPLIER_FIXTURE: Supplier = findEntityBy(
  {
    key: 'name',
    value: 'Castelo Campos do jordão',
    list: SUPPLIER_LIST_TEMP,
  },
);

export const CONDOMINIO_CIVIL_BRASIL_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Condominio Civil Brasil',
  list: SUPPLIER_LIST_TEMP,
});

export const CONFIANCE_GESTAO_CONDO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Confiance Gestao Condo',
  list: SUPPLIER_LIST_TEMP,
});

export const CONFRARIA_DA_BARBA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Confraria da Barba',
  list: SUPPLIER_LIST_TEMP,
});

export const DAISO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Daiso',
  list: SUPPLIER_LIST_TEMP,
});

export const DJACI_MARTINS_BEZERRA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Djaci Martins Bezerra',
  list: SUPPLIER_LIST_TEMP,
});

export const DONA_DE_CASA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Dona de Casa',
  list: SUPPLIER_LIST_TEMP,
});

export const DROGARIA_BRASIL_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Drogaria Brasil',
  list: SUPPLIER_LIST_TEMP,
});

export const DROGARIA_PACHECO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Drogaria Pacheco',
  list: SUPPLIER_LIST_TEMP,
});

export const DUNKIN_DONUTS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Dunkin Donuts',
  list: SUPPLIER_LIST_TEMP,
});

export const ECOPISTA_FPAY_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Ecopista FPay',
  list: SUPPLIER_LIST_TEMP,
});

export const ESPETINHO_ELENA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Espetinho Elena',
  list: SUPPLIER_LIST_TEMP,
});

export const ESTACIONAMENTO_BRASILIA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Estacionamento Brasilia',
  list: SUPPLIER_LIST_TEMP,
});

export const ETS_PIZZARIA_EXPRESS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'ets pizzaria express',
  list: SUPPLIER_LIST_TEMP,
});

export const GAMBAR_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Gambar',
  list: SUPPLIER_LIST_TEMP,
});

export const GUARAREMA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Guararema',
  list: SUPPLIER_LIST_TEMP,
});

export const ITAQUACETUBA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Itaquacetuba',
  list: SUPPLIER_LIST_TEMP,
});

export const KINOPLEX_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'kinoplex',
  list: SUPPLIER_LIST_TEMP,
});

export const LEVVO_DF_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'levvo DF',
  list: SUPPLIER_LIST_TEMP,
});

export const LOJAS_MILANO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Lojas Milano',
  list: SUPPLIER_LIST_TEMP,
});

export const MADERO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Madero',
  list: SUPPLIER_LIST_TEMP,
});

export const MB_PARKING_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Mb Parking',
  list: SUPPLIER_LIST_TEMP,
});

export const MOTIVA_IMOVEIS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Motiva Imóveis',
  list: SUPPLIER_LIST_TEMP,
});

export const NETSHOP_INFORMATICA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'NetShop Informatica',
  list: SUPPLIER_LIST_TEMP,
});

export const NOVA_RDE_EXPRESS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Nova Rde Express',
  list: SUPPLIER_LIST_TEMP,
});

export const O_BADEN_BADEN_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'O baden Baden',
  list: SUPPLIER_LIST_TEMP,
});

export const PAO_DE_ACUCAR_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Pão de Açucar',
  list: SUPPLIER_LIST_TEMP,
});

export const PAYGO_DIVINO_LANCHE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'paygo Divino Lanche',
  list: SUPPLIER_LIST_TEMP,
});

export const PETZ_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Petz',
  list: SUPPLIER_LIST_TEMP,
});

export const PG_TON_ANESIA_MARTINS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'PG TON ANESIA MARTINS',
  list: SUPPLIER_LIST_TEMP,
});

export const PLAYTIME_COMBUSTIVEL_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Playtime Combustivel',
  list: SUPPLIER_LIST_TEMP,
});

export const POSTO_SAN_REMO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Posto San Remo',
  list: SUPPLIER_LIST_TEMP,
});

export const PRIME_GLOBAL_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Prime Global',
  list: SUPPLIER_LIST_TEMP,
});

export const ROTA_DE_CASA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Rota de Casa',
  list: SUPPLIER_LIST_TEMP,
});

export const SANS_SOUCI_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Sans Souci',
  list: SUPPLIER_LIST_TEMP,
});

export const SAO_JOSE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'São Jose',
  list: SUPPLIER_LIST_TEMP,
});

export const SENHORA_BAFORADA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Senhora Baforada',
  list: SUPPLIER_LIST_TEMP,
});

export const SPOLETO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Spoleto',
  list: SUPPLIER_LIST_TEMP,
});

export const STARBUCKS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Starbucks',
  list: SUPPLIER_LIST_TEMP,
});

export const SUSHILOKO_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Sushiloko',
  list: SUPPLIER_LIST_TEMP,
});

export const VERO_TRATORIA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Vero Tratoria',
  list: SUPPLIER_LIST_TEMP,
});

export const CHINA_IN_BOX_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'China in Box',
  list: SUPPLIER_LIST_TEMP,
});

export const URBAN_CAPACETE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Urban Capacete',
  list: SUPPLIER_LIST_TEMP,
});

export const IFOOD_CLUB_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'IFood Clube',
  list: SUPPLIER_LIST_TEMP,
});

export const ANJOS_RESTAURANTE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Anjos Restaurante',
  list: SUPPLIER_LIST_TEMP,
});

export const ANDRE_VINICIOS_PEREIRA_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Andre Vinicios Pereira',
  list: SUPPLIER_LIST_TEMP,
});

export const IFOOD_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Ifood',
  list: SUPPLIER_LIST_TEMP,
});

export const GOOGLE_ONE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Google One',
  list: SUPPLIER_LIST_TEMP,
});

export const PIZZARIA_DOIS_IRMAOS_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Pizzaria dois irmãos',
  list: SUPPLIER_LIST_TEMP,
});

export const XIQUE_XIQUE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Xique Xique',
  list: SUPPLIER_LIST_TEMP,
});

export const MELIMAIS_MERCADO_LIVRE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'MeliMais Mercado Livre',
  list: SUPPLIER_LIST_TEMP,
});

export const MERCADO_LIVRE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Mercado Livre',
  list: SUPPLIER_LIST_TEMP,
});

export const NETFLIX_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Netflix',
  list: SUPPLIER_LIST_TEMP,
});

export const HBO_MAX_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'HBO Max',
  list: SUPPLIER_LIST_TEMP,
});

export const AMAZON_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Amazon',
  list: SUPPLIER_LIST_TEMP,
});

export const CREDIT_CARD_ANNUAL_FEE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Credit Card Annual Fee',
  list: SUPPLIER_LIST_TEMP,
});

export const CREDIT_CARD_LOSS_AND_THEFT_PROTECTION_SERVICE_SUPPLIER_FIXTURE: Supplier =
  findEntityBy({
    key: 'name',
    value: 'Credit Card Loss And Theft Protection Service',
    list: SUPPLIER_LIST_TEMP,
  });

export const CREDIT_CARD_ADDITIONAL_IOF_ON_FINANCED_BALANCE_SUPPLIER_FIXTURE: Supplier =
  findEntityBy({
    key: 'name',
    value: 'Credit Card IOF On Financed Balance',
    list: SUPPLIER_LIST_TEMP,
  });

export const CREDIT_CARD_PREVIOUS_INVOICE_BALANCE_SUPPLIER_FIXTURE: Supplier =
  findEntityBy({
    key: 'name',
    value: 'Credit Card Previous Invoice Balance',
    list: SUPPLIER_LIST_TEMP,
  });

export const CREDIT_CARD_CHARGES_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Credit Card Charges',
  list: SUPPLIER_LIST_TEMP,
});

export const MASONIC_LODGE_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Masonic Lodge',
  list: SUPPLIER_LIST_TEMP,
});

export const MOTORCYCLE_CLUB_SUPPLIER_FIXTURE: Supplier = findEntityBy({
  key: 'name',
  value: 'Motorcycle Club',
  list: SUPPLIER_LIST_TEMP,
});

export const PHILOSOPHICAL_MASONIC_LODGE_SUPPLIER_FIXTURE: Supplier =
  findEntityBy({
    key: 'name',
    value: 'Philosophical Masonic Lodge',
    list: SUPPLIER_LIST_TEMP,
  });

export const SUPPLIER_LIST_FIXTURE: Array<Supplier> = [
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
  MASONIC_LODGE_SUPPLIER_FIXTURE,
  MOTORCYCLE_CLUB_SUPPLIER_FIXTURE,
  PHILOSOPHICAL_MASONIC_LODGE_SUPPLIER_FIXTURE,
];