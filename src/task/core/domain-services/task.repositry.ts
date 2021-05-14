import { Task } from '../domain/task';

export interface TaskRepositry {
  findById(taskId: string): Promise<Task>;
  save(task: Task): Promise<Task>;
}
