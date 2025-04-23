export interface MonthYear {
  month: number; // 0-11
  year: number;
}

export function incrementMonth({ month, year }: MonthYear): MonthYear {
  if (month === 11) {
    return { month: 0, year: year + 1 };
  }
  return { month: month + 1, year };
}

export function decrementMonth({ month, year }: MonthYear): MonthYear {
  if (month === 0) {
    return { month: 11, year: year - 1 };
  }
  return { month: month - 1, year };
}

export function formatMonthYear(month: number, year: number, monthsArr: string[]): string {
  return `${monthsArr[month]} ${year}`;
}
