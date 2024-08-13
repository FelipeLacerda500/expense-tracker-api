import { PrismaExpenseRepository } from '../../repositories';
import { DeleteExpenseUseCase } from '../../use-cases';

export function deleteExpenseUseCaseFactory() {
  const expenseRepository = new PrismaExpenseRepository();

  const useCase = new DeleteExpenseUseCase(expenseRepository);

  return useCase;
}
