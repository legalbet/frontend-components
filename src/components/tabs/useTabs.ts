import type { MaybeRefOrGetter } from 'vue';
import type { TabItem } from '@/components/tabs/types';

export function useTabs<T extends TabItem>(params: {
  tabs: MaybeRefOrGetter<T[]>;
  modelValue: MaybeRefOrGetter<string | number>;
  emit: {
    (e: 'update:modelValue', value: string | number): void;
    (e: 'change', tab: T): void;
  };
}) {
  const { tabs, modelValue, emit } = params;
  // нормализуем список вкладок и добавляем fallback id, если не задан
  const normalizedTabs = computed(() =>
    toValue(tabs).map((t, i) => ({
      ...t,
      id: t.id ?? `tab-${i}-${t.text}`,
    }))
  );

  const activeId = computed(() => toValue(modelValue));

  function isActive(id: string | number) {
    return id === activeId.value;
  }

  // выбор вкладки
  function setActive(id: string | number) {
    const tab = normalizedTabs.value.find((t) => t.id === id);
    if (!tab || tab.disabled) return;
    emit('update:modelValue', id);
    emit('change', tab as T);
  }

  return {
    normalizedTabs,
    activeId,
    isActive,
    setActive,
  };
}
