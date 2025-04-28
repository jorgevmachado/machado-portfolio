import { NestModuleAbstract } from '../../nestModuleAbstract';
import type {
  IBillCategory,
  ICreateBillCategoryParams,
  IUpdateBillCategoryParams,
} from './interface';
import {INestModuleConfig} from "../../interface";

export class BillCategory extends NestModuleAbstract<
  IBillCategory,
  ICreateBillCategoryParams,
  IUpdateBillCategoryParams
> {
    constructor(nestModuleConfig: INestModuleConfig) {
        super({
            pathUrl: 'finance/bill',
            subPathUrl: 'category',
            nestModuleConfig,
        });
    }
}