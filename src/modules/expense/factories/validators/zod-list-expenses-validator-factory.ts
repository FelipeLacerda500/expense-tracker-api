import { ZodListExpensesValidator } from '../../validators';

export function zodListExpensesValidatorFactory() {
  return new ZodListExpensesValidator();
}
