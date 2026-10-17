import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTodoValidator {
  constructor(protected ctx: HttpContextContract) {}

  // Always report errors in the JSON "api" format, regardless of the Accept header.
  public reporter = validator.reporters.api

  public schema = schema.create({
    title: schema.string.optional({}, [rules.regex(/\S/), rules.maxLength(255)]),
    completed: schema.boolean.optional(),
  })

  public messages = {
    'title.string': 'Title must be a string',
    'title.regex': 'Title must not be empty',
    'title.maxLength': 'Title must be at most 255 characters',
    'completed.boolean': 'Completed must be true or false',
  }
}
