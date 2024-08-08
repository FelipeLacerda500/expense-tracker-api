import crypto from 'crypto';

export class Expense {
  private constructor(
    public id: string,
    public productOrService: string,
    public createdBy: string,
    public expenseAmount: number,
    public createdAt: Date,
  ) {}

  public static create(
    productOrService: string,
    createdBy: string,
    expenseAmount: number,
    createdAt?: Date,
    id?: string,
  ): Expense {
    return new Expense(
      id ?? crypto.randomUUID(),
      productOrService,
      createdBy,
      expenseAmount,
      createdAt ?? new Date(),
    );
  }

  public static isExpenseAmountValid(expenseAmount: number): boolean {
    return expenseAmount > 0;
  }
}
