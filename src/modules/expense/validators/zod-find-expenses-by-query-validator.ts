import { IValidation } from '@/shared/protocols';
import { formatZodErrors } from '@/shared/helpers';
import { expenseQuerySchema } from '../schemas';
import { ValidationError } from '@/shared/errors';

type ValidatorResponse = {
  productOrService?: string;
  createdBy?: string;
  page: number;
};

export class ZodFindExpensesByQueryValidator
  implements IValidation<ValidatorResponse>
{
  validate(input: unknown): ValidatorResponse {
    const parsedExpenseData = expenseQuerySchema.safeParse(input);

    if (!parsedExpenseData.success) {
      throw new ValidationError(null, {
        ...formatZodErrors(parsedExpenseData.error.issues),
      });
    }

    const { productOrService, createdBy, page } = parsedExpenseData.data;

    return { productOrService, createdBy, page };
  }
}
