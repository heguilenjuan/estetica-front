export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function nowInTimezone(timezone: string): Date {
  const now = new Date()

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(now)

  const get = (type: string) =>
    Number(parts.find(p => p.type === type)?.value)

  return new Date(
    get("year"),
    get("month") - 1,
    get("day")
  )
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth() + amount,
    1
  )
}

export function subMonths(date: Date, amount: number): Date {
  return addMonths(date, -amount)
}

export function getYear(date: Date): number {
  return date.getFullYear()
}

export function getMonth(date: Date): number {
  return date.getMonth() // 0–11
}

export function formatISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, amount: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

export function getDay(date: Date): number {
  return date.getDay(); // 0–6
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
