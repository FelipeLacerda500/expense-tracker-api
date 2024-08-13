import { PrismaExpenseRepository } from '../../repositories';
import { ListExpensesUseCase } from '../../use-cases';

export function listExpensesUseCaseFactory() {
  const expenseRepository = new PrismaExpenseRepository();

  const useCase = new ListExpensesUseCase(expenseRepository);

  return useCase;
}
