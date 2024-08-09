import { IExpenseRepository, IExpenseUseCase } from '../protocols';

type UseCaseResponse = {
  dailyExpenseSum: number;
  dailyExpenseCount: number;
  monthlyExpenseSum: number;
  monthlyExpenseCount: number;
};

export class GetExpenseMetricsUseCase
  implements IExpenseUseCase<UseCaseResponse>
{
  constructor(private readonly expenseRepository: IExpenseRepository) {}

  public async execute(): Promise<UseCaseResponse> {
    const expenseMetrics =
      await this.expenseRepository.calculateExpenseMetrics();

    return expenseMetrics;
  }
}
