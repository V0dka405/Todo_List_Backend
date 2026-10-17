/**
 * Config source: https://git.io/JfefC
 */

import Env from '@ioc:Adonis/Core/Env'
import type { CorsConfig } from '@ioc:Adonis/Core/Cors'

// "http://localhost:5173, https://todo.example.com" -> ['http://localhost:5173', '...']
const allowedOrigins = (Env.get('CORS_ORIGIN', '') as string)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsConfig: CorsConfig = {
  enabled: true,

  // No CORS_ORIGIN configured -> reflect any origin (handy for local development).
  // Otherwise only the listed origins are accepted.
  origin: allowedOrigins.length === 0 ? true : allowedOrigins,

  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: true,
  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ],
  credentials: true,
  maxAge: 90,
}

export default corsConfig
