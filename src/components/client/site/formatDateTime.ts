export function formatDateTime(dateTime: Date): string {
  const year = dateTime.getFullYear();
  const month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
  const date = ("0" + dateTime.getDate()).slice(-2);
  const hours = ("0" + dateTime.getHours()).slice(-2);
  const minutes = ("0" + dateTime.getMinutes()).slice(-2);
  const seconds = ("0" + dateTime.getSeconds()).slice(-2);
  return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
}

// 日付を"yyyy/MM/dd"形式にフォーマットする関数
export const FormatDate_yyyy_MM_dd = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};