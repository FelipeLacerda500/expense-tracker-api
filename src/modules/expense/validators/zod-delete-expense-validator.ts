import { IValidation } from '@/shared/protocols';
import { formatZodErrors } from '@/shared/helpers';
import { expenseBodySchema } from '../schemas';
import { ValidationError } from '@/shared/errors';

type ValidatorResponse = {
  id: string;
};

export class ZodDeleteExpenseValidator
  implements IValidation<ValidatorResponse>
{
  validate(input: unknown): ValidatorResponse {
    const parsedExpenseData = expenseBodySchema.safeParse(input);

    if (!parsedExpenseData.success) {
      throw new ValidationError(null, {
        ...formatZodErrors(parsedExpenseData.error.issues),
      });
    }

    const { id } = parsedExpenseData.data;

    return { id };
  }
}
