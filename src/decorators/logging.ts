import 'reflect-metadata';
import logger from '../utils/logger';

// Method call decorator
export function logMethodCall(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    const className = target.constructor.name;
    const methodName = propertyKey;
    const logMessage = `${className}.${methodName}
    (${args.map((arg) => JSON.stringify(arg)).join(', ')})`;

    logger.info(logMessage);

    return originalMethod.apply(this, args);
  };

  return descriptor;
}