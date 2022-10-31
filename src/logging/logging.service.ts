import { Injectable } from '@nestjs/common';
import SonicBoom from 'sonic-boom';

import { LogDTO, Logger } from './logging';

enum LEVEL {
  ERROR = 'ERROR',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

@Injectable()
export class LoggingService implements Logger {
  private logger: SonicBoom;

  constructor() {
    this.logger = new SonicBoom({ fd: process.stdout.fd });
  }

  private formatAndWriteLog(level: LEVEL, source: string, data: unknown) {
    const log = JSON.stringify({ level, source, data }).concat('\n');
    this.logger.write(log);
  }

  info(data: LogDTO): void {
    this.formatAndWriteLog(LEVEL.INFO, data.source, data.data);
  }
  error(data: LogDTO): void {
    this.formatAndWriteLog(LEVEL.ERROR, data.source, data.data);
  }
  debug(data: LogDTO): void {
    this.formatAndWriteLog(LEVEL.DEBUG, data.source, data.data);
  }
}
