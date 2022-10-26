import 'dotenv/config';

export class AppConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): AppConfig {
    for (const k of keys) this.getValue(k, true);
    return this;
  }

  public getAmountOoMessages(): string |number {
    return this.getValue('TotalMessages') || 1;
  }

  public getPort(): string | number {
    return this.getValue('apiPort') || 8001;
  }

  public getAppSecret(): string | undefined {
    return this.getValue('APP_SECRET', true);
  }

  public getJwtExpired(): string | undefined {
    return this.getValue('JWT_EXPIRED', true);
  }

  public getUri(): string | undefined {
    return this.getValue('RabbitMQConnectionURI', true);
  }
}

const appConfig = new AppConfig(process.env).ensureValues([
  'apiPort',
  'HOST',
  'APP_SECRET',
  'JWT_EXPIRED',
]);

export { appConfig };
