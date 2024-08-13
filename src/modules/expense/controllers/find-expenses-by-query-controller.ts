import { findExpensesByQueryUseCaseFactory } from '../factories/use-cases';
import { zodFindExpensesByQueryValidatorFactory } from '../factories/validators';
import { ApiReply, ApiRequest } from '@/server/@types';

type findExpensesByQueryRequest = {
  productOrService?: string;
  createdBy?: string;
  page: number;
};

export async function findExpensesByQueryController(
  request: ApiRequest & { query: findExpensesByQueryRequest },
  reply: ApiReply,
) {
  const expenseValidator = zodFindExpensesByQueryValidatorFactory();

  const { productOrService, createdBy, page } = expenseValidator.validate(
    request.query,
  );

  const findExpensesByQueryUseCase = findExpensesByQueryUseCaseFactory();

  const expenses = await findExpensesByQueryUseCase.execute({
    productOrService,
    createdBy,
    page,
  });

  return reply.status(200).send(expenses);
}
