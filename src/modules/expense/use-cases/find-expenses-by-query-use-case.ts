import { ListOrFindExpenseQueryDTO } from '../dtos';
import { Expense } from '../entities';
import { IExpenseUseCase, IExpenseRepository } from '../protocols';

type UseCaseResponse = {
  items: Expense[];
  total: number;
};

export class FindExpensesByQueryUseCase
  implements IExpenseUseCase<UseCaseResponse>
{
  constructor(private readonly expenseRepository: IExpenseRepository) {}

  public async execute(
    data: ListOrFindExpenseQueryDTO,
  ): Promise<UseCaseResponse> {
    const { items, total } = await this.expenseRepository.findByQuery({
      productOrService: data.productOrService,
      createdBy: data.createdBy,
      page: data.page,
    });

    return { items, total };
  }
}
