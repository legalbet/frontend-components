# Типизация Provide/Inject в Vue.js

## Проблема

При использовании `provide`/`inject` без правильной типизации возникают ошибки TypeScript при сборке:
- Отсутствие типов для injection keys
- Неявные типы `any`
- Ошибки компиляции

## Решение

### 1. Создание типизированных ключей

Файл `injection-keys.ts` содержит типизированные ключи для `provide`/`inject`:

```typescript
import { InjectionKey } from 'vue';

// Типизированные ключи для provide/inject
export const TRANSLATION_KEY = Symbol('translation') as InjectionKey<(key: string) => string>;
export const ROUTE_KEY = Symbol('route') as InjectionKey<(name: string, params?: Record<string, any>) => string>;

// Типы для функций
export type TranslationFunction = (key: string) => string;
export type RouteFunction = (name: string, params?: Record<string, any>) => string;
```

### 2. Использование в родительском компоненте (provide)

```typescript
import { provide } from 'vue';
import { TRANSLATION_KEY, ROUTE_KEY, type TranslationFunction, type RouteFunction } from './injection-keys';

// Правильная типизация provide
provide(TRANSLATION_KEY, (attrs?._ as TranslationFunction) ?? ((key: string) => key));
provide(ROUTE_KEY, (attrs?.route as RouteFunction) ?? (() => ''));
```

### 3. Использование в дочерних компонентах (inject)

```typescript
import { inject } from 'vue';
import { TRANSLATION_KEY, ROUTE_KEY } from './injection-keys';

// Типизированный inject с fallback значениями
const _ = inject(TRANSLATION_KEY, (key: string) => key);
const route = inject(ROUTE_KEY, () => '');
```

## Преимущества

1. **Типобезопасность** - TypeScript проверяет типы на этапе компиляции
2. **Автодополнение** - IDE предоставляет подсказки для injected значений
3. **Рефакторинг** - Легко найти все места использования через Symbol
4. **Отсутствие ошибок сборки** - Правильная типизация предотвращает ошибки компиляции

## Обновленные файлы

- `injection-keys.ts` - Типизированные ключи
- `index.vue` - Provide с типизацией
- `MenuProfile.vue` - Inject с типизацией
- `SearchForm.vue` - Inject с типизацией
- `ProfileMobile.vue` - Inject с типизацией
- `Desktop.vue` - Inject с типизацией
