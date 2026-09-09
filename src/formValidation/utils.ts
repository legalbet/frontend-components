export function isEmail(value: string): boolean {
  return /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,7})+$/.test(value);
}

export function isNumeric(value: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(value);
}

export function isOnlyLetters(value: string): boolean {
  return /^[a-zа-я-'\s]+$/i.test(value);
}

export function isPhone(value: string): boolean {
  return /^7\d{10}$/.test(value);
}

export function isPositiveNumeric(value: string): boolean {
  return isNumeric(value) && parseFloat(value) > 0;
}

export function isLessThanDate(value: string, borderDate: string): boolean {
  return new Date(formatDate(value)).getTime() <= new Date(formatDate(borderDate)).getTime();
}

export function isMoreThanDate(value: string, borderDate: string): boolean {
  return new Date(formatDate(value)).getTime() >= new Date(formatDate(borderDate)).getTime();
}

export function isValidDate(value: string): boolean {
  const formattedValue = formatDate(value);
  const [year, month, day] = formattedValue.split('.').map(Number);
  const date = new Date(`${year}-${month}-${day}`);
  return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}
export function isMinMaxDate(value: string, minDate: string, maxDate: string): boolean {
  const inputDate = new Date(formatDate(value));
  return !(
    new Date(formatDate(minDate)).getTime() > inputDate.getTime() ||
    new Date(formatDate(maxDate)).getTime() < inputDate.getTime()
  );
}

function formatDate(date: string): string {
  // DD.MM.YYYY to YYYY.MM.DD
  const dateArray = date.split('.');
  return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;
}
export function isLatinDigitsDot(value: string): boolean {
  const latinDigitsDotPattern = /^[A-Za-z0-9._-]*$/;
  return latinDigitsDotPattern.test(value);
}
