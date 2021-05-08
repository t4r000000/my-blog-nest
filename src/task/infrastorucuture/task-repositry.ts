import { Task } from 'src/task/core/domain/task';
import { taskRepositry } from '../core/domain-services/task-application';

export class TaskImplementsAsRDB implements taskRepositry {
  findById = (taskId: number) => {
    return new Task('dosomethins', new Date());
  };

  save(task: Task): Task {
    return task;
  }
}
