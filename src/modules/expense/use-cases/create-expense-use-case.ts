import { IExpenseRepository, IExpenseUseCase } from '../protocols';
import { ValidationError } from '@/shared/errors';
import { AddExpenseDTO } from '../dtos';
import { Expense } from '../entities';

export class CreateExpenseUseCase implements IExpenseUseCase<Expense> {
  constructor(private readonly expenseRepository: IExpenseRepository) {}

  public async execute(data: AddExpenseDTO): Promise<Expense> {
    const productOrService = data.productOrService;
    const createdBy = data.createdBy;
    const expenseAmount = data.expenseAmount;

    if (!Expense.isExpenseAmountValid(expenseAmount)) {
      throw new ValidationError();
    }

    const expense = await this.expenseRepository.create({
      productOrService,
      createdBy,
      expenseAmount,
    });

    return expense;
  }
}
