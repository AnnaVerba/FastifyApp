import 'dotenv/config';
export declare class AppConfig {
    private env;
    constructor(env: {
        [k: string]: string | undefined;
    });
    private getValue;
    ensureValues(keys: string[]): AppConfig;
    getHost(): string;
    getPort(): string | number;
    getAppSecret(): string | undefined;
    getJwtExpired(): string | undefined;
    getUrl(): string | undefined;
}
declare const appConfig: AppConfig;
export { appConfig };
