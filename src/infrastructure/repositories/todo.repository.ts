import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from 'src/domain/repositories/todoRepository.interface';
import { Todo } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { TodoM } from 'src/domain/model/todo';

@Injectable()
export class DatabaseTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoEntityRepository: Repository<Todo>,
  ) {}
  async updateContent(id: number, isDone: boolean): Promise<void> {
    await this.todoEntityRepository.update({ id }, { isDone });
  }
  async findAll(): Promise<Todo[]> {
    return this.todoEntityRepository.find();
  }
  async insert(todo: TodoM): Promise<void> {
    const todoEntity = this.toTodoEntity(todo);
    await this.todoEntityRepository.save(todoEntity);
  }
  async findById(id: number): Promise<TodoM> {
    const todoEntity = await this.todoEntityRepository.findOneOrFail({
      where: { id },
    });
    return this.toTodo(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    this.todoEntityRepository.delete(id);
  }

  private toTodoEntity(todo: TodoM): Todo {
    const todoEntity = new Todo();
    todoEntity.id = todo.id;
    todoEntity.content = todo.content;
    todoEntity.isDone = todo.isDone;
    return todoEntity;
  }

  private toTodo(todoEntity: Todo): TodoM {
    const todo = new TodoM();
    todo.id = todoEntity.id;
    todo.content = todoEntity.content;
    todo.isDone = todoEntity.isDone;
    todo.createdAt = todoEntity.createdAt;
    todo.updatedAt = todoEntity.updatedAt;
    return todo;
  }
}
