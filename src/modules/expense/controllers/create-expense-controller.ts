import { createExpenseUseCaseFactory } from '../factories/use-cases';
import { zodCreateExpenseValidatorFactory } from '../factories/validators';
import { ApiReply, ApiRequest } from '@/server/@types';
import { ValidationError } from '@/shared/errors';

type createExpenseRequest = {
  productOrService: string;
  createdBy: string;
  expenseAmount: number;
};

export async function createExpenseController(
  request: ApiRequest & { body: createExpenseRequest },
  reply: ApiReply,
) {
  const { productOrService, createdBy, expenseAmount } = request.body;

  if (
    !productOrService ||
    !createdBy ||
    !expenseAmount ||
    Object.keys(request.body).length !== 3
  ) {
    throw new ValidationError();
  }

  const ExpenseValidator = zodCreateExpenseValidatorFactory();

  ExpenseValidator.validate(request.body);

  const createExpenseUseCase = createExpenseUseCaseFactory();

  const expense = await createExpenseUseCase.execute({
    productOrService,
    createdBy,
    expenseAmount,
  });

  return reply.status(201).send({ ...expense });
}
