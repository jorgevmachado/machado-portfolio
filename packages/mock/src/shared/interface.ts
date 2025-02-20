export interface PaginateResponse {
    skip: number;
    next: number;
    prev: number;
    total: number;
    pages: number;
    results: Array<unknown>,
    per_page: number;
    current_page: number;
}
export interface ResultResponse {
    response?: unknown;
    responseError?: {
        error: string;
        message: string;
        statusCode: number;
    }
    statusCode: number;
}

export interface MockEntity {
    id: string;
    alias: string;
    label: string;
    list: Array<unknown>;
}