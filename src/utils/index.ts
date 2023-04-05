export function formatDate(date: Date) {
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  const monthString = month < 10 ? "0" + month : String(month);
  const dateString = dayOfMonth < 10 ? "0" + dayOfMonth : String(dayOfMonth);
  return `${date.getFullYear()}-${monthString}-${dateString}`;
}
