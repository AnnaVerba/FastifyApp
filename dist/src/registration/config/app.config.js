"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = exports.AppConfig = void 0;
require("dotenv/config");
class AppConfig {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        for (const k of keys)
            this.getValue(k, true);
        return this;
    }
    getHost() {
        return this.getValue('HOST') || '0.0.0.0';
    }
    getPort() {
        return this.getValue('apiPort') || 8001;
    }
    getAppSecret() {
        return this.getValue('APP_SECRET', true);
    }
    getJwtExpired() {
        return this.getValue('JWT_EXPIRED', true);
    }
    getUrl() {
        return this.getValue('EMAIL_CONFIRMATION_URL', true);
    }
}
exports.AppConfig = AppConfig;
const appConfig = new AppConfig(process.env).ensureValues([
    'apiPort',
    'HOST',
    'APP_SECRET',
    'JWT_EXPIRED',
]);
exports.appConfig = appConfig;
//# sourceMappingURL=app.config.js.map