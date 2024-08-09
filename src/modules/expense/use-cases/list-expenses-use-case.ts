import { ListOrFindExpenseQueryDTO } from '../dtos';
import { Expense } from '../entities';
import { IExpenseUseCase, IExpenseRepository } from '../protocols';

type UseCaseResponse = {
  items: Expense[];
  total: number;
};

export class ListExpensesUseCase implements IExpenseUseCase<UseCaseResponse> {
  constructor(private readonly expenseRepository: IExpenseRepository) {}

  public async execute(
    data: ListOrFindExpenseQueryDTO,
  ): Promise<UseCaseResponse> {
    const { items, total } = await this.expenseRepository.listAll({
      page: data.page,
    });

    return { items, total };
  }
}
