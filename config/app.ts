/**
 * Config source: https://git.io/JfefZ
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import proxyAddr from 'proxy-addr'
import Env from '@ioc:Adonis/Core/Env'
import type { ServerConfig } from '@ioc:Adonis/Core/Server'
import type { LoggerConfig } from '@ioc:Adonis/Core/Logger'
import type { ProfilerConfig } from '@ioc:Adonis/Core/Profiler'
import type { ValidatorConfig } from '@ioc:Adonis/Core/Validator'

/*
|--------------------------------------------------------------------------
| Application secret key
|--------------------------------------------------------------------------
|
| Generate one with `node ace generate:key` and store it in `.env`.
|
*/
export const appKey: string = Env.get('APP_KEY')

/*
|--------------------------------------------------------------------------
| Http server configuration
|--------------------------------------------------------------------------
*/
export const http: ServerConfig = {
  allowMethodSpoofing: false,
  subdomainOffset: 2,
  generateRequestId: false,
  trustProxy: proxyAddr.compile('loopback'),
  etag: false,
  jsonpCallbackName: 'callback',
  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: false,
    sameSite: false,
  },
  useAsyncLocalStorage: false,
}

/*
|--------------------------------------------------------------------------
| Logger
|--------------------------------------------------------------------------
*/
export const logger: LoggerConfig = {
  name: Env.get('APP_NAME'),
  enabled: true,
  level: Env.get('LOG_LEVEL', 'info'),
  prettyPrint: Env.get('NODE_ENV') === 'development',
}

/*
|--------------------------------------------------------------------------
| Profiler
|--------------------------------------------------------------------------
*/
export const profiler: ProfilerConfig = {
  enabled: true,
  blacklist: [],
  whitelist: [],
}

/*
|--------------------------------------------------------------------------
| Validator
|--------------------------------------------------------------------------
*/
export const validator: ValidatorConfig = {}
