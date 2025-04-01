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

export interface ResultResponseError {
    error: string;
    message: string;
    statusCode: number;
}

export interface ResultResponse<T = unknown> {
    response?: T;
    statusCode: number;
    responseError?:ResultResponseError;
}

export interface MockEntity<T = unknown> {
    id: string;
    list: Array<T>;
    alias: string;
    label: string;
}