// Utilitário de log estruturado
// Define os tipos de log permitidos
type LogType = 'info' | 'warn' | 'error' | 'debug';

interface LogOptions {
  type: LogType;
  message: string;
  details?: string;
}

/**
 * Loga uma mensagem estruturada no console.
 * @param options - Opções de log
 */
export const log = ({ type, message, details }: LogOptions): void => {
  const timestamp = new Date().toISOString();
  const logMsg = `[${timestamp}] [${type.toUpperCase()}] ${message} ${details ? `- ${details}` : ''}`;
  switch (type) {
    case 'info':
      //biome-ignore lint/suspicious/noConsole: permitido para logs
      console.info(logMsg);
      break;
    case 'warn':
      //biome-ignore lint/suspicious/noConsole: permitido para logs
      console.warn(logMsg);
      break;
    case 'error':
      //biome-ignore lint/suspicious/noConsole: permitido para logs
      console.error(logMsg);
      break;
    case 'debug':
      //biome-ignore lint/suspicious/noConsole: permitido para logs
      console.debug(logMsg);
      break;
    default:
      //biome-ignore lint/suspicious/noConsole: permitido para logs
      console.log(logMsg);
  }
};
