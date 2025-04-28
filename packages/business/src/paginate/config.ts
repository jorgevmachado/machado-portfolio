export function getTotalNumberOfPagesIntoPagination(total: number, limit: number, perPage: number) {
    if(limit === 0) {
        return Math.ceil(total / perPage);
    }
    return Math.ceil(total / limit);
}