/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { name: 'Todo API', status: 'ok' }
})

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.serviceUnavailable(report)
})

Route.group(() => {
  Route.get('/todos', 'TodosController.index')
  Route.post('/todos', 'TodosController.store')
  Route.get('/todos/:id', 'TodosController.show').where('id', /^[0-9]+$/)
  Route.put('/todos/:id', 'TodosController.update').where('id', /^[0-9]+$/)
  Route.patch('/todos/:id', 'TodosController.update').where('id', /^[0-9]+$/)
  Route.delete('/todos/:id', 'TodosController.destroy').where('id', /^[0-9]+$/)
}).prefix('/api')
