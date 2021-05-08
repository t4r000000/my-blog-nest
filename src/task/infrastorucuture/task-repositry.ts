import { Task } from 'src/task/core/domain/task';
import { TaskRepositry } from '../core/domain-services/task-repositry';

export class TaskImplementsAsRDB implements TaskRepositry {
  findById = (taskId: number) => {
    return new Task('dosomethins', new Date());
  };

  save(task: Task): Task {
    return task;
  }
}
