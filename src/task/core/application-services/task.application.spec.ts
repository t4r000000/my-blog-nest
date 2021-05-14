import TaskApplication from './task.application';
import { TaskImplementsAsPrisma } from '../../infrastructure/task.prisma';
import { PrismaService } from '../../../utils/prisma/prisma.service';
import { Task } from '../domain/task';
// タスクは必ずタスク名、期日を持つ
// タスクは未完了状態で作成し、完了したら戻すことはできない
// タスクは3回だけ、1日ずつ延期することができる。
// タスク名は変更することができない

describe('Task Application', () => {
  const prismaService = new PrismaService();
  const repositry = new TaskImplementsAsPrisma(prismaService);
  const taskApplication = new TaskApplication(repositry);

  afterAll(async () => {
    await prismaService.onModuleDestroy();
  });

  it('should be defined', () => {
    expect(taskApplication).toBeDefined();
  });

  it('taskApplication should have taskrepositry instance', () => {
    expect(taskApplication.taskRepositry).toBe(repositry);
  });

  it('task application can create task', async () => {
    const createdTask = await taskApplication.createTask(
      new Task('doSomething', new Date()),
    );
    const createdTaskFromDB = await taskApplication.findTask(
      createdTask.getId(),
    );
    expect(createdTaskFromDB.getName()).toBe(createdTask.getName());
  });

  //エラーどうやって投げるん...?
  it('task application can throw error', async () => {
    taskApplication
      .createTask(new Task('doSomething', new Date()))
      .catch((err) => {
        expect(err.message).toBe('doSomething');
      });
  });
});
