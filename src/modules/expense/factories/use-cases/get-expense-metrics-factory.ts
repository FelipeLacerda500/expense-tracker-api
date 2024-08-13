import { PrismaExpenseRepository } from '../../repositories';
import { GetExpenseMetricsUseCase } from '../../use-cases';

export function getExpenseMetricsFactory() {
  const expenseRepository = new PrismaExpenseRepository();

  const useCase = new GetExpenseMetricsUseCase(expenseRepository);

  return useCase;
}
