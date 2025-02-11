export function formDate(date1, date2) {
  const d1 = new Date(date1).getDate();
  const d2 = new Date(date2).getDate();
  const days = d2 - d1;
  return Math.abs(days);
}
export function formatDates(date) {
  return Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
