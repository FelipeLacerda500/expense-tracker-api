import { IValidation } from '@/shared/protocols';
import { formatZodErrors } from '@/shared/helpers';
import { expenseBodySchema } from '../schemas';
import { ValidationError } from '@/shared/errors';

type ValidatorResponse = {
  productOrService: string;
  createdBy: string;
  expenseAmount: number;
};

export class ZodCreateExpenseValidator
  implements IValidation<ValidatorResponse>
{
  validate(input: unknown): ValidatorResponse {
    const parsedExpenseData = expenseBodySchema.safeParse(input);

    if (!parsedExpenseData.success) {
      throw new ValidationError(null, {
        ...formatZodErrors(parsedExpenseData.error.issues),
      });
    }

    const { productOrService, createdBy, expenseAmount } =
      parsedExpenseData.data;

    return { productOrService, createdBy, expenseAmount };
  }
}
