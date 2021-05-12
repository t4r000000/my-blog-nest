import { Injectable } from '@nestjs/common';
import TaskApplication from './core/application-services/task.application';
import { Task } from './core/domain/task';
import { TaskImplementsAsPrisma } from './infrastructure/task.prisma';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskImplementsAsPrisma: TaskImplementsAsPrisma,
  ) {}

  findTask = async (id: number): Promise<Task> => {
    const taskApplication = new TaskApplication(this.taskImplementsAsPrisma);
    return await taskApplication.findTask(Number(id));
  };

  createTask = async (taskName: string, dueDate: Date): Promise<Task> => {
    const taskApplication = new TaskApplication(this.taskImplementsAsPrisma);
    return await taskApplication.createTask(new Task(taskName, dueDate));
  };
}
