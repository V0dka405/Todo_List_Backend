/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| The application refuses to boot when a required variable is missing or
| has the wrong type, so configuration mistakes surface immediately.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

  PG_HOST: Env.schema.string({ format: 'host' }),
  PG_PORT: Env.schema.number(),
  PG_USER: Env.schema.string(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string(),

  // Comma separated list of allowed browser origins, e.g.
  // "http://localhost:5173,https://todo.example.com". Empty = allow all.
  CORS_ORIGIN: Env.schema.string.optional(),
})
