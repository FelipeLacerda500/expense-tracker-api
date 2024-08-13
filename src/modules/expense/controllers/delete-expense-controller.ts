import { deleteExpenseUseCaseFactory } from '../factories/use-cases';
import { zodDeleteExpenseValidatorFactory } from '../factories/validators';
import { ApiReply, ApiRequest } from '@/server/@types';
import { ValidationError } from '@/shared/errors';

type deleteExpenseRequest = {
  id: string;
};

export async function deleteExpenseController(
  request: ApiRequest & { body: deleteExpenseRequest },
  reply: ApiReply,
) {
  const { id } = request.body;

  if (!id || Object.keys(request.body).length !== 1) {
    throw new ValidationError();
  }

  const ExpenseValidator = zodDeleteExpenseValidatorFactory();

  ExpenseValidator.validate(request.body);

  const deleteExpenseUseCase = deleteExpenseUseCaseFactory();

  await deleteExpenseUseCase.execute({
    id,
  });

  return reply.status(204).send({});
}
