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

  findTask = (id: string): Promise<Task> => {
    return new Promise((resolve, reject) => {
      this.taskRepositry
        .findById(id)
        .then((task) => resolve(task))
        .catch((err) => reject(new Error(err)));
    });
  };

  postPone = async (taskId: string, date: number): Promise<Task> => {
    return new Promise((resolve, reject) => {
      this.taskRepositry
        .findById(taskId)
        .then((task) => {
          return task.postpone(date);
        })
        .then((task) => {
          resolve(this.taskRepositry.save(task));
        })
        .catch((error) => reject(new Error(error)));
    });
  };
}

export default TaskApplication;
