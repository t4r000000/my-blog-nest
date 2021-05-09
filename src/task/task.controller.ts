import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { Task } from './core/domain/task';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async findById(@Param() params: { id: number }): Promise<Task> {
    return await this.taskService.findTask(Number(params.id));
  }

  @Post()
  async saveTask(@Body() taskPost: { name: string; dueDate: Date }) {
    return await this.taskService.createTask(taskPost.name, taskPost.dueDate);
  }
}
