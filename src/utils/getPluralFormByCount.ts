// Функция склонения числительных

export function getPluralFormByCount(number: number, titles: string | string[], locale?: string): string {
  const titlesArray = typeof titles === 'string' ? titles.split(/\s+/) : [...titles];
  const [single = '', few = '', many = ''] = titlesArray;

  if (titlesArray.length < 3) {
    return single;
  }

  const absNumber = Math.abs(number);

  // Для не-русских локалей
  if (locale !== 'ru') {
    return absNumber === 1 ? single : few;
  }

  const titleByIndex = [single, few, many] as const;
  return titleByIndex[getRussianTitleIndex(absNumber)];
}

function getRussianTitleIndex(absNumber: number): 0 | 1 | 2 {
  if (absNumber % 100 > 4 && absNumber % 100 < 20) {
    return 2;
  }
  return [2, 0, 1, 1, 1, 2][Math.min(absNumber % 10, 5)] as 0 | 1 | 2;
}
