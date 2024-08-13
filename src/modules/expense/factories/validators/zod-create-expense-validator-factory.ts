import { ZodCreateExpenseValidator } from '../../validators';

export function zodCreateExpenseValidatorFactory() {
  return new ZodCreateExpenseValidator();
}
