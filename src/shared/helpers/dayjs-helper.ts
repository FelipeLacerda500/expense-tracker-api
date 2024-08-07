import dayjs from 'dayjs';

export const startOfCurrentDay = dayjs().startOf('day').toDate();
export const endOfCurrentDay = dayjs().endOf('day').toDate();
export const startOfMonth = dayjs().startOf('month').toDate();
export const endOfMonth = dayjs().endOf('month').toDate();
