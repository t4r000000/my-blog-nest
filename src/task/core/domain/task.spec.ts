import { Task } from './task';

// タスクは必ずタスク名、期日を持つ
// タスクは未完了状態で作成し、完了したら戻すことはできない
// タスクは3回だけ、1日ずつ延期することができる。
// タスク名は変更することができない

describe('Task Domain', () => {
  const task = new Task('doSomething', new Date());
  it('should be defined', () => {
    expect(task).toBeDefined();
  });

  it('dueDate only acceptable positive number ', () => {
    try {
      task.postpone(0);
    } catch (error) {
      expect(error.message).toBe('1以下の値が入力されています');
    }
  });

  it('dueDate can be postPoned only three times', () => {
    try {
      task.postpone(10);
      task.postpone(10);
      task.postpone(10);
    } catch (error) {
      expect(error.message).toBe('最大延期回数を超過しています');
    }
  });

  it('task status should be "UNDONE" in default', () => {
    expect(task.getStatus()).toBe('UNDONE');
  });

  it('task status should be "DONE" after done()', () => {
    task.done();
    expect(task.getStatus()).toBe('DONE');
  });
});
