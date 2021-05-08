import { Task } from '../domain/task';

export interface taskRepositry {
  findById(taskId: number): Task;
  save(task: Task): Task;
}

class TaskApplication {
  taskRepositry: taskRepositry;
  constructor(taskRepositry: taskRepositry) {
    this.taskRepositry = taskRepositry;
  }

  createTask = (name: string, date: Date): Task => {
    const task = new Task(name, date);
    return this.taskRepositry.save(task);
  };

  postPone(taskId: number, date: number): void {
    const task = this.taskRepositry.findById(taskId);
    task.postpone(date);
    this.taskRepositry.save(task);
  }
}

export default TaskApplication;
