import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { TaskRepositry } from '../core/domain-services/task.repositry';
import { Task } from '../core/domain/task';

@Injectable()
export class TaskImplementsAsPrisma implements TaskRepositry {
  constructor(private prisma: PrismaService) {}

  findById = (id: string): Promise<Task> | null => {
    return new Promise((resolve, reject) => {
      this.prisma.task
        .findUnique({
          where: { id: id },
        })
        .then((task) => resolve(new Task(task.name, task.dueDate)))
        .catch((err) => reject(new Error(err)));
    });
  };

  save = (task: Task): Promise<Task> => {
    return new Promise((resolve, reject) => {
      this.prisma.task
        .create({
          data: {
            id: task.getId(),
            name: task.getName(),
            status: task.getStatus(),
            dueDate: task.getDueDate(),
            postponeCount: task.getPostPoneCount(),
          },
        })
        .then((tasks) => resolve(new Task(tasks.name, tasks.dueDate, tasks.id)))
        .catch((err) => reject(new Error(err)));
    });
  };
}
