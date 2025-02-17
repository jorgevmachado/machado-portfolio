export interface INestConfig {
  baseUrl: string;
  token?: string;
}

export interface INestModuleConfig extends Pick<INestConfig, 'baseUrl'> {
  headers: Record<string, string>;
}

export interface INestBaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface INestBaseResponse {
  message: string;
}