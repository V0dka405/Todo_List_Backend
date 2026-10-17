import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Every error is returned as JSON with a stable shape:
 *   { code: string, message: string, errors?: [...] }
 */
export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).send({
        code: 'E_ROW_NOT_FOUND',
        message: 'Todo not found',
      })
    }

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send({
        code: 'E_VALIDATION_FAILURE',
        message: 'Validation failed',
        errors: error.messages?.errors ?? [],
      })
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.status(404).send({
        code: 'E_ROUTE_NOT_FOUND',
        message: 'Route not found',
      })
    }

    return super.handle(error, ctx)
  }
}
