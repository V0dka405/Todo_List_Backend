import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Todo from 'App/Models/Todo'

export default class TodoSeeder extends BaseSeeder {
  public async run() {
    await Todo.createMany([
      { title: 'Read the project README', completed: true },
      { title: 'Add my first todo', completed: false },
      { title: 'Try the Postman collection', completed: false },
    ])
  }
}
