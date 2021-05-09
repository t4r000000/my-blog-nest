import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import TaskApplication from './core/application-services/task.application';
import { Task } from './core/domain/task';
import { TaskImplementsAsPrisma } from './infrastorucuture/task.prisma';

@Controller('task')
export class TaskController {
  constructor(private readonly taskImplementAsPrisma: TaskImplementsAsPrisma) {}

  @Get(':id')
  async findById(@Param() params: { id: number }): Promise<Task> {
    const taskApplication = new TaskApplication(this.taskImplementAsPrisma);
    return taskApplication.findTask(Number(params.id));
  }

  @Post()
  async saveTask(@Body() taskPost: { name: string; dueDate: Date }) {
    const taskApplication = new TaskApplication(this.taskImplementAsPrisma);
    return taskApplication.createTask(
      new Task(taskPost.name, taskPost.dueDate),
    );
  }
}
