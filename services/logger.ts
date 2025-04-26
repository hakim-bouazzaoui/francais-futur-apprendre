type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
  details?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private MAX_LOGS = 1000;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, details?: any): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] ${level.toUpperCase()}:`;
    const detailsStr = details ? `\n${JSON.stringify(details, null, 2)}` : '';
    return `${prefix} ${message}${detailsStr}`;
  }

  private addLog(level: LogLevel, message: string, details?: any) {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      message,
      details
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    if (__DEV__) {
      const formattedMessage = this.formatMessage(level, message, details);
      switch (level) {
        case 'debug':
          console.log(formattedMessage);
          break;
        case 'info':
          console.info(formattedMessage);
          break;
        case 'warn':
          console.warn(formattedMessage);
          break;
        case 'error':
          console.error(formattedMessage);
          break;
      }
    }
  }

  public debug(message: string, details?: any) {
    this.addLog('debug', message, details);
  }

  public info(message: string, details?: any) {
    this.addLog('info', message, details);
  }

  public warn(message: string, details?: any) {
    this.addLog('warn', message, details);
  }

  public error(message: string, details?: any) {
    this.addLog('error', message, details);
  }

  public getLogs(level?: LogLevel): LogEntry[] {
    return level 
      ? this.logs.filter(log => log.level === level)
      : [...this.logs];
  }

  public clearLogs() {
    this.logs = [];
  }

  public getStartupSummary() {
    const errorCount = this.logs.filter(log => log.level === 'error').length;
    const warnCount = this.logs.filter(log => log.level === 'warn').length;
    
    return {
      totalLogs: this.logs.length,
      errors: errorCount,
      warnings: warnCount,
      isHealthy: errorCount === 0,
      startTime: this.logs.length > 0 ? this.logs[this.logs.length - 1].timestamp : Date.now(),
      lastLog: this.logs[0]?.timestamp || Date.now(),
    };
  }
}

export const logger = Logger.getInstance();