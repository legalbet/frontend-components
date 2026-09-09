import { useState, useRoute } from '@fc/composables/useNuxtShims';
import { computed, watch } from 'vue';
import type { PopupStore, PopupName, PopupParams } from '@fc/popupsContainer/composables/popupStore/types';
export function usePopupStore() {
  const popupStore = useState<PopupStore>('popup-store', () => ({
    activePopup: { popupName: null, params: null },
    popupQueue: [],
  }));
  const getActivePopup = computed<{ popupName: PopupName | null; params?: PopupParams[PopupName] | null }>(
    () => popupStore.value.activePopup
  );
  const setActivePopup = (popupName: PopupName | null, params?: PopupParams[PopupName]) => {
    popupStore.value.activePopup = { popupName: popupName, params: params || null };
  };

  const showPopup = (popupName: PopupName, params?: PopupParams[PopupName]) => {
    if (popupName === popupStore.value.activePopup.popupName) {
      return;
    }

    if (!popupStore.value.activePopup.popupName) {
      setActivePopup(popupName, params);
      return;
    }

    if (popupStore.value.popupQueue.some((popup) => popup.popupName === popupName)) {
      return;
    }

    popupStore.value.popupQueue.push({ popupName: popupName, params: params });
  };

  const showPopupHard = (popupName: PopupName, params?: PopupParams[PopupName]) => {
    // Открываем попап вне очереди заменяя текущий активный
    // Не добавляем в popupQueue ничего
    // Поскольку текущий открытый попап не находится в popupQueue, то мы не нуждаемся popupQueue.value.shift()
    // В итоге мы никак не изменяем popupQueue и если в очереди поппапов есть модалки, то они там и останутся
    setActivePopup(popupName, params);
  };
  const closePopup = () => {
    //Активный попап не лежит в popupQueue, поэтому просто берём следующий из очереди
    const nextPopup = popupStore.value.popupQueue.shift();

    if (nextPopup) {
      setActivePopup(nextPopup.popupName, nextPopup.params);
      return;
    }

    setActivePopup(null);
  };

  if (typeof window !== "undefined") {
    const route = useRoute();
    watch(
      () => route.fullPath,
      () => {
        popupStore.value.popupQueue = [];
        setActivePopup(null);
      }
    );
  }

  return {
    showPopup,
    showPopupHard,
    closePopup,
    getActivePopup,
  };
}
