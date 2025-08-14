import { nextTick, onUnmounted, onUpdated, ref, Ref, watch } from 'vue';
import PerfectScrollbar from 'perfect-scrollbar';

/*
 * Используем во vue, когда надо чтобы скроллбар отображался сразу при появлении элемента
 * scrollBarContainer - элемент контейнер для скроллбара
 * isContainerVisible - условие видимости контейра ref или computed
 */

export function usePerfectScrollbar(scrollBarContainer: Ref<HTMLElement | null>, isContainerVisible: Ref<boolean>) {
  const scrollBar = ref<PerfectScrollbar | null>(null);

  watch(isContainerVisible, async (isVisible) => {
    if (!isVisible) return;

    //Дожидаемся обновления DOM
    await nextTick();

    requestAnimationFrame(() => {
      const el = scrollBarContainer.value;

      if (!el) {
        return;
      }

      if (!scrollBar.value) {
        scrollBar.value = new PerfectScrollbar(el, {
          wheelPropagation: false,
        });
      } else {
        scrollBar.value.update();
      }

      //Принудительно тригерим появление скроллбара
      if (el.scrollHeight > el.clientHeight) {
        el.scrollTop = 1;
        el.scrollTop = 0;
      }
    });
  });

  onUpdated(() => {
    scrollBar.value?.update();
  });

  onUnmounted(() => {
    scrollBar.value?.destroy();
    scrollBar.value = null;
  });
}
