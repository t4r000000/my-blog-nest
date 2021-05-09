import { Task } from '../domain/task';

export interface TaskRepositry {
  findById(taskId: number): Promise<Task>;
  save(task: Task): Promise<Task>;
}
