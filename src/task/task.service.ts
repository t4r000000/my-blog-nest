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

  findTask = async (id: string): Promise<Task> => {
    return new Promise((resolve, reject) => {
      this.taskApplication
        .findTask(id)
        .then((task) => {
          resolve(task);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };

  createTask = (taskName: string, dueDate: Date): Promise<Task> => {
    return new Promise((resolve, reject) => {
      this.taskApplication
        .createTask(new Task(taskName, dueDate))
        .then((task) => {
          resolve(task);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  };
}
