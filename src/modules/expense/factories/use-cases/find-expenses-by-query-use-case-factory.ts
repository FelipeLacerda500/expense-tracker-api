import { PrismaExpenseRepository } from '../../repositories';
import { FindExpensesByQueryUseCase } from '../../use-cases';

export function findExpensesByQueryUseCaseFactory() {
  const expenseRepository = new PrismaExpenseRepository();

  const useCase = new FindExpensesByQueryUseCase(expenseRepository);

  return useCase;
}
