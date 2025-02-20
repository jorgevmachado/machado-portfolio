export interface FinanceEntity {
    id: string;
    label: string;
    list: Array<unknown>;
    type?: FinanceEntity;
    group?: FinanceEntity;
    supplier?: FinanceEntity;
    category?: FinanceEntity;
}