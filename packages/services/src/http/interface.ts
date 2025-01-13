export interface RequestConfig<B = any> {
  body?: B;
  params?: Record<string, any>;
  override?: Omit<RequestInit, 'body' | 'method'>;
}

export interface ResponseError {
  error: string;
  message: string;
  statusCode: number;
}
