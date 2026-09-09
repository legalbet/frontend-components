# Базовая фильтрация
На примере бонусов, реализована так, что есть хабовая страница (/bonus/) и страницы подборок (/bonus/sets/:seoName/).
Визульно эти страницы не отличаются и содержат UI элементы для применения фильтров. Набор фильтров формирует урл с гет параметрами типа
/bonus/?condition[]=10&condition[]=9&condition[]=61&condition[]=8&type[]=441&type[]=4. 
После формирования запрос отправляется на апи и если набор фильтров соответствует какой-то подборке - присылает ее seoName, происходит навигация на роут подборок (/bonus/sets/:seoName/).
Если на странице подборки начинают применяться фильтры - урл опят становится типа хаб с гет параметром.

## Фильтрация состоит из следующих основных элементов:

* useFilterController - отвечает за примененные фильтры и делает из них гет параметры для урла
* useFilterDataLoader - загрузка данных как на сервере (useSsrFetch), так и на клиенте (useFetchWithAbort)
* usePageWithFilter - хук для страниц, которые используют фильтрацию, он объединяет в себе useFilterController и useFilterDataLoader, и должен использоваться в компонентах страниц

### Функции - утилиты app/features/filter/utils.ts
* parseSelectedFilters - достает фильтры из гет параметров урла
* selectedFiltersToQuery - строит объект с гет параметрами из объекта примененных фильтиров
* toggleSelected - обрабатывает чек / снятие чекбокса (применение фильтра)
* buildEncodedQueryFromRouteQuery - делает урл с закодированными [], vue router оставляет их

### UI компоненты фильтра:
* FilterMain.vue - основной компонент фильтра
* UiFilterCheckboxItem.vue - чекбокс лейбл число - эмитит (e: 'update:modelValue', value: boolean): void;
* UiFilterCheckboxList.vue - список чекбокс-айтемов эмитит (e: 'toggle', payload: { id: number; checked: boolean }): void;

