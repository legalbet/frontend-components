import { onMounted, onBeforeUnmount, type Ref } from 'vue';
export function useClickOutside(
  component: Ref<HTMLElement | null>,
  callback: () => void,
  excludeComponent?: Ref<HTMLElement | null> // Устанавливаем значение по умолчанию null
) {
  if (!component) {
    throw new Error('A target component has to be provided.');
  }

  if (!callback) {
    throw new Error('A callback has to be provided.');
  }

  const listener = (event: MouseEvent) => {
    if (
      event.target === component.value ||
      event.composedPath().includes(component.value as HTMLElement) ||
      (excludeComponent &&
        (event.target === excludeComponent.value ||
          event.composedPath().includes(excludeComponent.value as HTMLElement)))
    ) {
      return;
    }
    if (typeof callback === 'function') {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener('click', listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', listener);
  });
}
