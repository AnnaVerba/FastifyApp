import 'dotenv/config';
import * as dotenv from 'dotenv';
dotenv.config();
export class AppConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return <string>value;
  }

  public ensureValues(keys: string[]): AppConfig {
    for (const k of keys) this.getValue(k, true);
    return this;
  }

  public getAmqplib(): string {
    return this.getValue('amqpServer')||'amqp://localhost:5672';
  }
}

const appConfig = new AppConfig(process.env).ensureValues([
  'amqpServer',
]);

export { appConfig };
