import { ZodFindExpensesByQueryValidator } from '../../validators';

export function zodFindExpensesByQueryValidatorFactory() {
  return new ZodFindExpensesByQueryValidator();
}
