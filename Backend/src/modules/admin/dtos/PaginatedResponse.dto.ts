export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResponseDto<T> {
    data: T[];
    meta: PaginationMeta;
}
