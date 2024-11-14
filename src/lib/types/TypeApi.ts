export type HttpMethod = "get" | "post" | "put" | "delete";

export interface RequestOptionsType {
  headers?: HeadersInit;
  params?: Record<string, string | number>;
}

export interface RequestType extends RequestOptionsType {
  endpoint: string;
  type: HttpMethod;
  options?: RequestOptionsType;
  data?: any;
}
