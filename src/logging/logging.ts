export interface LogDTO {
  readonly source: string;
  readonly data?: any;
}
export interface Logger {
  info(data: LogDTO): void;
  error(data: LogDTO): void;
  debug(data: LogDTO): void;
}
