import { Task } from '../domain/task';

export interface TaskRepositry {
  findById(taskId: number): Task;
  save(task: Task): Task;
}
