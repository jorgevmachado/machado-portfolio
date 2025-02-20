export interface PaginateResponse<T = unknown> {
    skip: number;
    next: number;
    prev: number;
    total: number;
    pages: number;
    results: Array<T>,
    per_page: number;
    current_page: number;
}
export interface ResultResponse<T = unknown> {
    response?: T;
    responseError?: {
        error: string;
        message: string;
        statusCode: number;
    }
    statusCode: number;
}

export interface MockEntity<T = unknown> {
    id: string;
    alias: string;
    label: string;
    list: Array<T>;
}