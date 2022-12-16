export interface Pagination {
    offset?: number;
    page?: number;
    limit?: number;
    totalItemCount?: number;
    totalPageCount?: number;
    current?: number;
}

export interface PaginatedResponse<T> {
    pagination: Pagination;
    items: T[];
}
