import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import CreateTodoValidator from 'App/Validators/CreateTodoValidator'
import UpdateTodoValidator from 'App/Validators/UpdateTodoValidator'

export default class TodosController {
  /**
   * GET /api/todos
   * Optional filter: ?completed=true | ?completed=false
   */
  public async index({ request }: HttpContextContract) {
    const { completed } = request.qs()
    const query = Todo.query().orderBy('id', 'desc')

    if (completed === 'true' || completed === 'false') {
      query.where('completed', completed === 'true')
    }

    return await query
  }

  /**
   * POST /api/todos
   * Body: { "title": "Buy milk" }
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateTodoValidator)
    const todo = await Todo.create({ title: payload.title.trim(), completed: false })

    return response.created(todo)
  }

  /**
   * GET /api/todos/:id
   */
  public async show({ params }: HttpContextContract) {
    return await Todo.findOrFail(params.id)
  }

  /**
   * PUT|PATCH /api/todos/:id
   * Body: { "title"?: string, "completed"?: boolean }
   */
  public async update({ params, request, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    const payload = await request.validate(UpdateTodoValidator)

    if (payload.title === undefined && payload.completed === undefined) {
      return response.unprocessableEntity({
        code: 'E_VALIDATION_FAILURE',
        message: 'Provide at least one of: title, completed',
      })
    }

    if (payload.title !== undefined) todo.title = payload.title.trim()
    if (payload.completed !== undefined) todo.completed = payload.completed
    await todo.save()

    return todo
  }

  /**
   * DELETE /api/todos/:id
   */
  public async destroy({ params, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()

    return response.noContent()
  }
}
