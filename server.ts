/*
|--------------------------------------------------------------------------
| AdonisJS Server
|--------------------------------------------------------------------------
|
| Boots the HTTP server. Used by `node ace serve` in development and by
| `node server.js` from the compiled `build` folder in production.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname).httpServer().start()
