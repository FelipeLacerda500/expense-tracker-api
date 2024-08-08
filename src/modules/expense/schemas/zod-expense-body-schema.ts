import { z } from 'zod';

export const expenseBodySchema = z.object({
  id: z
    .string({ message: 'ID deve ser uma string.' })
    .uuid({ message: 'ID deve ser um UUID válido.' })
    .optional(),
  productOrService: z
    .string({ message: 'O produto ou serviço deve ser uma string.' })
    .min(2, {
      message: 'O produto ou serviço deve ter no mínimo 2 caracteres.',
    })
    .optional(),
  createdBy: z
    .string({
      message:
        'O nome da pessoa que cadastrou uma despesa deve ser uma string.',
    })
    .min(2, {
      message:
        'O nome da pessoa que cadastrou deve ter no mínimo 2 caracteres.',
    })
    .optional(),
  expenseAmount: z
    .number({ message: 'O valor da despesa deve ser um número válido.' })
    .positive({ message: 'O valor da despesa deve ser positivo.' })
    .optional(),
});
