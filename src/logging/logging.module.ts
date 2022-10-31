import { Global, Module } from '@nestjs/common';
import { LoggingService } from './logging.service';

// Following module exposes "LoggerService" by using manually registered Token "AppLogger"
// This allows us to implement "Dependency Inversion" principle. Now we are able to keep
//global dep. "LoggerService" loosely coupled and easy-to-replace.
@Global()
@Module({
  providers: [
    {
      provide: 'AppLogger',
      useClass: LoggingService,
    },
  ],
  exports: ['AppLogger'],
})
export class LoggingModule {}
