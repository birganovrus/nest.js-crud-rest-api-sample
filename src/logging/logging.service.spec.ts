import { Test, TestingModule } from '@nestjs/testing';
import { LogDTO } from './logging';
import { LoggingService } from './logging.service';

const writeMock = jest.fn().mockImplementation(() => true);

jest.mock('sonic-boom', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        write: writeMock,
      };
    }),
  };
});

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingService],
    }).compile();

    service = module.get<LoggingService>(LoggingService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should print message when info is called', () => {
    const logData: LogDTO = { source: 'info-test', data: { test: true } };
    const formattedLog = JSON.stringify({ level: 'INFO', ...logData }).concat('\n');
    service.info(logData);
    expect(writeMock).toHaveBeenCalledWith(formattedLog);
  });

  it('should print message when error is called', () => {
    const logData: LogDTO = { source: 'error-test', data: { test: true } };
    const formattedLog = JSON.stringify({ level: 'ERROR', ...logData }).concat('\n');
    service.error(logData);
    expect(writeMock).toHaveBeenCalledWith(formattedLog);
  });

  it('should print message when debug is called', () => {
    const logData: LogDTO = { source: 'debug-test', data: { test: true } };
    const formattedLog = JSON.stringify({ level: 'DEBUG', ...logData }).concat('\n');
    service.debug(logData);
    expect(writeMock).toHaveBeenCalledWith(formattedLog);
  });
});
