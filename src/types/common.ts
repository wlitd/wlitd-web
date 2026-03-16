import type { PaginationInfo } from 'naive-ui'

export type Pagination = Omit<PaginationInfo, 'startIndex' | 'endIndex' | 'pageCount'>
