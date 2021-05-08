import { Task } from '../domain/task';
import { TaskRepositry } from '../domain-services/task-repositry';

class TaskApplication {
  taskRepositry: TaskRepositry;
  constructor(taskRepositry: TaskRepositry) {
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
