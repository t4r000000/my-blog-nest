import { Injectable } from '@nestjs/common';
import TaskApplication from './core/application-services/task.application';
import { Task } from './core/domain/task';
import { TaskImplementsAsPrisma } from './infrastructure/task.prisma';

@Injectable()
export class TaskService {
  private readonly taskApplication: TaskApplication;
  constructor(private readonly taskImplementsAsPrisma: TaskImplementsAsPrisma) {
    this.taskApplication = new TaskApplication(this.taskImplementsAsPrisma);
  }

  findTask = async (id: number): Promise<Task> => {
    return await this.taskApplication.findTask(Number(id));
  };

  createTask = async (taskName: string, dueDate: Date): Promise<Task> => {
    return await this.taskApplication.createTask(new Task(taskName, dueDate));
  };
}
