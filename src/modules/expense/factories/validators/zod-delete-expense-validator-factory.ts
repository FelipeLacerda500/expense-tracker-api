import { ZodDeleteExpenseValidator } from '../../validators';

export function zodDeleteExpenseValidatorFactory() {
  return new ZodDeleteExpenseValidator();
}
