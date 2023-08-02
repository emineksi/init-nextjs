export class EntityDto<T = string> {
    id!: T;
  }
  export interface PagedFilterAndSortedRequest {
    MaxResultCount: number;
    SkipCount: number;
    sorting?:string;
    filter?:string;
  }
  export interface PagedResultDto<T> {
    totalCount: number;
    items: T[];
  }
    