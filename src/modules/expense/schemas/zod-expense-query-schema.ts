import { z } from 'zod';

export const expenseQuerySchema = z.object({
  productOrService: z
    .string({ message: 'O produto ou serviço deve ser uma string.' })
    .optional(),
  createdBy: z
    .string({
      message:
        'O nome da pessoa que cadastrou uma despesa deve ser uma string.',
    })
    .optional(),
  page: z.coerce
    .number({ message: 'O valor da página deve ser um número válido.' })
    .int({ message: 'O valor da página deve ser inteiro.' })
    .positive({ message: 'O valor da página deve ser positivo.' })
    .optional(),
});
