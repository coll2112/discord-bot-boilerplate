type LogContext = Record<string, unknown>;

const serializeContext = (context?: LogContext): string => {
  if (!context || Object.keys(context).length === 0) {
    return "";
  }

  return ` ${JSON.stringify(context)}`;
};

export const logger = {
  info: (message: string, context?: LogContext): void => {
    console.info(`[info] ${message}${serializeContext(context)}`);
  },
  warn: (message: string, context?: LogContext): void => {
    console.warn(`[warn] ${message}${serializeContext(context)}`);
  },
  error: (message: string, context?: LogContext): void => {
    console.error(`[error] ${message}${serializeContext(context)}`);
  }
} as const;
