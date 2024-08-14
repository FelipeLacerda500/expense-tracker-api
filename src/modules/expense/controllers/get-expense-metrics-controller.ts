import { getExpenseMetricsFactory } from '../factories/use-cases';
import { ApiReply, ApiRequest } from '@/server/@types';

export async function getExpenseMetricsController(
  request: ApiRequest,
  reply: ApiReply,
) {
  const getExpenseMetricsUseCase = getExpenseMetricsFactory();

  const expenseMetrics = await getExpenseMetricsUseCase.execute();

  return reply.status(200).send(expenseMetrics);
}
