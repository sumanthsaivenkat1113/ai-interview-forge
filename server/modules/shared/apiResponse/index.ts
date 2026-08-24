import { PaginationMeta } from "@/modules/features/shared/paginationMeta"

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    meta?: PaginationMeta;
    message?: string;
    error?: string;
}