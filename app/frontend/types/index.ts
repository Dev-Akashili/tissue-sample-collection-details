export * from "./collection";
export * from "./sample";
export * from "./filter";

export interface PaginatedResponse<T> {
  count: number;
  list: T[];
}
