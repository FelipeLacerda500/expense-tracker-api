import { PrismaExpenseRepository } from '../../repositories';
import { CreateExpenseUseCase } from '../../use-cases';

export function createExpenseUseCaseFactory() {
  const expenseRepository = new PrismaExpenseRepository();

  const useCase = new CreateExpenseUseCase(expenseRepository);

  return useCase;
}
