export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    meta?: PaginationMeta;
    message?: string;
    error?: string;
}


export interface interview {
    id: string,
    qno: number,
    question: string,
    workspaceId: String,
    createdAt: Date,
    updatedAt: Date,
}


