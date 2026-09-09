// Функция для формирования пути к файлу на cdn
export default function (path: string): string {
  if (!path) {
    console.log('Path is empty in asset function!');
    return '';
  }
  if (path.indexOf('/cdn/static/') === 0) {
    return path.replace('/cdn/static/', 'https://static.legalcdn.org/');
  } else if (path.indexOf('/static/') === 0) {
    return path.replace('/static/', 'https://static.legalcdn.org/');
  }

  return path;
}
