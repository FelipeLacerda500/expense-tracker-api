import { listExpensesUseCaseFactory } from '../factories/use-cases';
import { zodListExpensesValidatorFactory } from '../factories/validators';
import { ApiReply, ApiRequest } from '@/server/@types';

type listExpensesRequest = {
  page: number;
};

export async function listExpensesController(
  request: ApiRequest & { query: listExpensesRequest },
  reply: ApiReply,
) {
  const expenseValidator = zodListExpensesValidatorFactory();

  const { page } = expenseValidator.validate(request.query);

  const listExpensesUseCase = listExpensesUseCaseFactory();

  const expenses = await listExpensesUseCase.execute({
    page,
  });

  return reply.status(200).send(expenses);
}
