export function formDate(date1, date2) {
  const d1 = new Date(date1).getDate();
  const d2 = new Date(date2).getDate();
  const days = d2 - d1;
  return Math.abs(days);
}
