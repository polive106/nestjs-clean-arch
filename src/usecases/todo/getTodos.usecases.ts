import { TodoM } from 'src/domain/model/todo';
import { TodoRepository } from 'src/domain/repositories/todoRepository.interface';

export class getTodosUsecases {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getTodos(): Promise<TodoM[]> {
    return await this.todoRepository.findAll();
  }
}
