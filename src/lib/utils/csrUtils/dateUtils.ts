export function getWeekDay(dateStr: string): string {
  const days = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
  const day = dateStr.split(" ")[0];
  const date = new Date(day);
  return days[date.getDay()];
}
export function toLocalHour(utcString: string): string {
  const date = new Date(utcString + "Z");
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
