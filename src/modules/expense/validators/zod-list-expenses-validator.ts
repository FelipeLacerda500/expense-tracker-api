import { IValidation } from '@/shared/protocols';
import { formatZodErrors } from '@/shared/helpers';
import { expenseQuerySchema } from '../schemas';
import { ValidationError } from '@/shared/errors';

type ValidatorResponse = { page: number };

export class ZodListExpensesValidator
  implements IValidation<ValidatorResponse>
{
  validate(input: unknown): ValidatorResponse {
    const parsedExpenseData = expenseQuerySchema.safeParse(input);

    if (!parsedExpenseData.success) {
      throw new ValidationError(null, {
        ...formatZodErrors(parsedExpenseData.error.issues),
      });
    }

    const page = parsedExpenseData.data.page;

    return { page };
  }
}
