// ドメイン知識
// タスクは必ずタスク名、期日を持つ
// タスクは未完了状態で作成し、完了したら戻すことはできない
// タスクは3回だけ、1日ずつ延期することができる。
// タスク名は変更することができない

export class Task {
  private id?: number;
  private name: string;
  private status: 'DONE' | 'UNDONE';
  private dueDate: Date;
  private postponeCount: number;
  private static POSTPONE_MAX_COUNT: 3 = 3;

  constructor(name: string, dueDate: Date, id?: number) {
    this.name = name;
    this.status = 'UNDONE';
    this.dueDate = dueDate;
    this.postponeCount = 0;
    if (id) {
      this.id = id;
    }
  }

  // タスクは3回だけ、1日ずつ延期することができる。
  postpone = (postPoneDate: number): void => {
    if (this.postponeCount >= Task.POSTPONE_MAX_COUNT) {
      throw new Error('最大延期回数を超過しています');
    }
    if (0 > postPoneDate) {
      throw new Error('1以下の値が入力されています');
    }
    this.dueDate.setDate(this.dueDate.getDate() + postPoneDate);
    this.postponeCount++;
  };

  // タスクは未完了状態で作成し、完了したら戻すことはできない
  done = (): void => {
    this.status = 'DONE';
  };

  //getter
  getId = () => {
    return this.id;
  };
  getName = () => {
    return this.name;
  };
  getStatus = () => {
    return this.status;
  };
  getDueDate = () => {
    return this.dueDate;
  };
  getPostPoneCount = () => {
    return this.postponeCount;
  };
}
