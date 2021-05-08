import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import TaskApplication from '../task/core/domain-services/task-application';
import { TaskImplementsAsRDB } from '../task/infrastorucuture/task-repositry';
import { Task } from 'src/task/core/domain/task';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/task')
  saveTask(): Task {
    const taskApplication = new TaskApplication(new TaskImplementsAsRDB());
    return taskApplication.createTask('example', new Date());
  }
}
