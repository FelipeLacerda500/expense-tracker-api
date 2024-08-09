import { ResourceNotFoundError } from '@/shared/errors';
import { IExpenseRepository, IExpenseUseCase } from '../protocols';

type UseCaseRequest = {
  id: string;
};

export class DeleteExpenseUseCase implements IExpenseUseCase<void> {
  constructor(private readonly expenseRepository: IExpenseRepository) {}

  public async execute(data: UseCaseRequest): Promise<void> {
    const expense = await this.expenseRepository.findById(data.id);

    if (!expense) {
      throw new ResourceNotFoundError('Despesa não encontrada.');
    }

    await this.expenseRepository.delete(expense.id);
  }
}
