import { RetryOptions } from './Retry';

export interface CloudConfigOptions {
  bootstrapPath?: string;
  configPath: string;
  activeProfiles: string[];
  level?: string;
}

export interface ConfigClientRetryOptions extends RetryOptions {
}

export interface ConfigClientOptions {
  enabled: boolean;
  'fail-fast': boolean;
  name: string;
  retry?: ConfigClientRetryOptions;
}

export interface Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

export interface ConfigObject extends Document {
}
