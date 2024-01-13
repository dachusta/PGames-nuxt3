export const useDTFormat = (date: string | Date): string => {
  const handler = (d: number): string => d < 10 ? '0' + d : `${d}`;

  if (typeof date === 'string') {
    const parsedDate = new Date(date);
    date = parsedDate;
  }

  const year = date.getFullYear();
  const month = handler(date.getMonth() + 1);
  const day = handler(date.getDate());

  return `${day}.${month}.${year}`;
};
