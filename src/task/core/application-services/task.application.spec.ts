import TaskApplication from './task.application';
import { TaskImplementsAsPrisma } from '../../infrastructure/task.prisma';
import { PrismaService } from '../../../utils/prisma/prisma.service';

// タスクは必ずタスク名、期日を持つ
// タスクは未完了状態で作成し、完了したら戻すことはできない
// タスクは3回だけ、1日ずつ延期することができる。
// タスク名は変更することができない

describe('Task Application', () => {
  const repositry = new TaskImplementsAsPrisma(new PrismaService());
  const taskApplication = new TaskApplication(repositry);

  it('抽象化されたTaskRepositryにPrismaで具象下したインスタンスを注入可能かテスト', () => {
    expect(taskApplication.taskRepositry).toBe(repositry);
  });

  it('should be defined', () => {
    expect(taskApplication).toBeDefined();
  });
});
