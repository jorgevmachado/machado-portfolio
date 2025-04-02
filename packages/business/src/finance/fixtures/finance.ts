import {
    transformObjectDateAndNulls,
} from '@repo/services/entities/entities';

import FINANCE_FIXTURE_JSON from '@repo/mock-json/finance/finance.json';

import Finance from '../finance';

export const FINANCE_FIXTURE: Finance = transformObjectDateAndNulls<Finance, unknown>(FINANCE_FIXTURE_JSON);