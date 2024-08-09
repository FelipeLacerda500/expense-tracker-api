import { prisma } from '@/infra/db';
import { IExpenseRepository } from '../../protocols';
import { Expense } from '../../entities';
import { AddExpenseDTO, ListOrFindExpenseQueryDTO } from '../../dtos';
import {
  endOfCurrentDay,
  endOfMonth,
  startOfCurrentDay,
  startOfMonth,
} from '@/shared/helpers';

export class PrismaExpenseRepository implements IExpenseRepository {
  public async create(data: AddExpenseDTO): Promise<Expense> {
    const expense = await prisma.$transaction(async (prisma) => {
      const maxSequence = await prisma.expense.aggregate({
        _max: {
          sequence: true,
        },
      });

      const newSequence = (maxSequence._max.sequence ?? 0) + 1;

      return prisma.expense.create({
        select: {
          id: true,
          productOrService: true,
          createdBy: true,
          expenseAmount: true,
          createdAt: true,
        },
        data: {
          ...data,
          sequence: newSequence,
        },
      });
    });

    return expense;
  }

  public async listAll(
    data: ListOrFindExpenseQueryDTO,
  ): Promise<{ items: Expense[]; total: number }> {
    const itemsPerPage = 20;

    const totalExpenseOrdersCount = await prisma.expense.count();

    const pageStartOrder = totalExpenseOrdersCount - data.page * itemsPerPage;
    const pageEndOrder = pageStartOrder + itemsPerPage;

    const expenses = await prisma.expense.findMany({
      select: {
        id: true,
        productOrService: true,
        createdBy: true,
        expenseAmount: true,
        createdAt: true,
      },
      where: {
        sequence: {
          gt: pageStartOrder,
          lte: pageEndOrder,
        },
      },
      orderBy: { sequence: 'desc' },
    });

    return {
      items: expenses,
      total: totalExpenseOrdersCount,
    };
  }

  public async findByQuery(
    data: ListOrFindExpenseQueryDTO,
  ): Promise<{ items: Expense[]; total: number }> {
    const { productOrService, createdBy, page } = data;
    const itemsPerPage = 20;

    const total = await prisma.expense.count({
      where: {
        AND: [
          productOrService
            ? {
                productOrService: {
                  contains: productOrService,
                },
              }
            : {},
          createdBy ? { createdBy: { contains: createdBy } } : {},
        ],
      },
    });

    const filteredExpenses = await prisma.expense.findMany({
      select: {
        id: true,
        productOrService: true,
        createdBy: true,
        expenseAmount: true,
        createdAt: true,
      },
      where: {
        AND: [
          productOrService
            ? {
                productOrService: {
                  contains: productOrService,
                },
              }
            : {},
          createdBy ? { createdBy: { contains: createdBy } } : {},
        ],
      },
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: {
        sequence: 'desc',
      },
    });

    return {
      items: filteredExpenses,
      total,
    };
  }

  public async findById(id: string): Promise<Expense> {
    const expense = await prisma.expense.findFirst({
      select: {
        id: true,
        productOrService: true,
        createdBy: true,
        expenseAmount: true,
        createdAt: true,
      },
      where: { id },
    });

    if (!expense) {
      return null;
    }

    return expense;
  }

  public async calculateExpenseMetrics(): Promise<{
    dailyExpenseSum: number;
    dailyExpenseCount: number;
    monthlyExpenseSum: number;
    monthlyExpenseCount: number;
  }> {
    const dailyMetrics = await prisma.expense.aggregate({
      where: {
        createdAt: {
          gte: startOfCurrentDay,
          lte: endOfCurrentDay,
        },
      },
      _sum: { expenseAmount: true },
      _count: { expenseAmount: true },
    });

    const monthlyMetrics = await prisma.expense.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: { expenseAmount: true },
      _count: { expenseAmount: true },
    });

    return {
      dailyExpenseSum: dailyMetrics._sum.expenseAmount,
      dailyExpenseCount: dailyMetrics._count.expenseAmount,
      monthlyExpenseSum: monthlyMetrics._sum.expenseAmount,
      monthlyExpenseCount: monthlyMetrics._count.expenseAmount,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const expense = await prisma.expense.findFirst({ where: { id } });

    if (!expense) {
      return false;
    }

    await prisma.expense.delete({ where: { id } });

    return true;
  }
}
