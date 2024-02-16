type ISODateString = string;

export function formatDate(date: ISODateString): string {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}
