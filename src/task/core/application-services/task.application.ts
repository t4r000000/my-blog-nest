import { Task } from '../domain/task';
import { TaskRepositry } from '../domain-services/task.repositry';

class TaskApplication {
  taskRepositry: TaskRepositry;
  constructor(taskRepositry: TaskRepositry) {
    this.taskRepositry = taskRepositry;
  }

  createTask = (task: Task): Promise<Task> => {
    return new Promise((resolve, reject) => {
      this.taskRepositry
        .save(task)
        .then((task) => resolve(task))
        .catch((err) => reject(new Error(err)));
    });
  };

  findTask = (id: number): Promise<Task> => {
    return new Promise((resolve, reject) => {
      this.taskRepositry
        .findById(id)
        .then((task) => resolve(task))
        .catch((err) => reject(new Error(err)));
    });
  };

  postPone(taskId: number, date: number): void {
    this.taskRepositry.findById(taskId).then((task) => {
      task.postpone(date);
      this.taskRepositry.save(task);
    });
  }
}

export default TaskApplication;
