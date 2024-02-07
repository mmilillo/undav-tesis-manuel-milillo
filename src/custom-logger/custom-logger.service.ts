import { Injectable, LogLevel } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService{
    
    log(message: any, ...optionalParams: any[]) {
        console.log(message);
    }
    error(message: any, ...optionalParams: any[]) {
        console.error(message);
    }
    warn(message: any, ...optionalParams: any[]) {
        console.warn(message);
    }
    debug?(message: any, ...optionalParams: any[]) {
        console.debug(message);
    }
    verbose?(message: any, ...optionalParams: any[]) {
        console.debug(message);
    }
    fatal?(message: any, ...optionalParams: any[]) {
        console.error(message);
    }
    setLogLevels?(levels: LogLevel[]) {
        throw new Error('Method not implemented.');
    }
}
