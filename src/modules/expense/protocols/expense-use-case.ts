/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IExpenseUseCase<T = any> {
  execute(data: unknown): Promise<T>;
}
