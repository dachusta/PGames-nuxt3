export const useDTFormat = (date: string | Date): string => {
  const handler = (d: number) => d < 10 ? '0' + d : d

  date = new Date(date)
  const year = date.getFullYear()
  const month = handler(date.getMonth() + 1)
  const day = handler(date.getDate())

  return day + '.' + month + '.' + year
}