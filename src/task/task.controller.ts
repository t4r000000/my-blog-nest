import { Body, Controller, Post } from '@nestjs/common';
import TaskApplication from './core/application-services/task-application';
import { TaskImplementsAsRDB } from './infrastorucuture/task-repositry';

@Controller('task')
export class TaskController {
  @Post()
  async saveTask(@Body() taskPost: { name: string; dueDate: Date }) {
    const taskApplication = new TaskApplication(new TaskImplementsAsRDB());
    console.log(taskPost);
    return taskApplication.createTask(taskPost.name, taskPost.dueDate);
  }
}
