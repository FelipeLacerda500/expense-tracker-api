/* eslint-disable require-await, arrow-body-style */

import { FastifyInstance } from 'fastify';
import {
  createExpenseController,
  deleteExpenseController,
  findExpensesByQueryController,
  getExpenseMetricsController,
  listExpensesController,
} from '@/modules/expense/controllers';

export async function appRoutes(app: FastifyInstance) {
  app.post('/', createExpenseController);
  app.delete('/', deleteExpenseController);
  app.get('/query', findExpensesByQueryController);
  app.get('/metrics', getExpenseMetricsController);
  app.get('/', listExpensesController);
}
