/* eslint-disable @typescript-eslint/no-explicit-any */

import { AddExpenseDTO, ListOrFindExpenseQueryDTO } from '../dtos';

export interface IExpenseRepository<T = any> {
  create(data: AddExpenseDTO): Promise<T>;
  listAll(
    data: ListOrFindExpenseQueryDTO,
  ): Promise<{ items: T[]; total: number }>;
  findByQuery(
    data: ListOrFindExpenseQueryDTO,
  ): Promise<{ items: T[]; total: number }>;
  findById(id: string): Promise<T | null>;
  calculateExpenseMetrics(): Promise<T>;
  delete(id: string): Promise<T>;
}
