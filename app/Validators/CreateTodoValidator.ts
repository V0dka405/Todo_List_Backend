import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTodoValidator {
  constructor(protected ctx: HttpContextContract) {}

  // Always report errors in the JSON "api" format, regardless of the Accept header.
  public reporter = validator.reporters.api

  // `regex(/\S/)` rejects whitespace-only titles; the controller trims the value.
  public schema = schema.create({
    title: schema.string({}, [rules.regex(/\S/), rules.maxLength(255)]),
  })

  public messages = {
    'title.required': 'Title is required',
    'title.string': 'Title must be a string',
    'title.regex': 'Title must not be empty',
    'title.maxLength': 'Title must be at most 255 characters',
  }
}
