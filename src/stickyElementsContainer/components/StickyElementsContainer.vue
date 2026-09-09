import { useRoute } from '@fc/composables/useNuxtShims';
<template>
  <div class="sticky-container" :class="{ 'menu-open': menuStore.store.value.isOpenMenu }">
    <div id="sticky-top" class="sticky-container__top"></div>
    <div id="sticky-middle" class="sticky-container__middle">
      <div v-show="!menuStore.store.value.isOpenMenu" id="cookie-wrapper" class="cookie-wrapper">
        <CookiesContainer />
      </div>
    </div>
    <div id="sticky-bottom" ref="stickyBottomRef" class="sticky-container__bottom">
      <div v-show="!menuStore.store.value.isOpenMenu && !isLandingLayout" id="sticky-catfish-wrapper" class="catfish">
        <AdfoxApp v-bind="{ ...adfoxbannerData }" />
      </div>
      <div id="sticky-menu" class="sticky-menu">
        <MenuMobileBottom v-if="showBottomMenu" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { MenuMobileBottom, useMenuStore, AdfoxApp, AdFoxBannerType, CookiesContainer } from '@fc/types/external-types';

const adfoxbannerData = {
  type: AdFoxBannerType.Catfish,
  id: 'sticky-catfish',
  pp: 'g',
};
const menuStore = useMenuStore();
const { showBottomMenu } = menuStore;

const route = useRoute();
const isLandingLayout = computed(() => route.meta.layout === 'landing');

const stickyBottomRef = ref<HTMLElement | null>(null);

function moveCatfishToStickyBlock(timeout = 5000): void {
  const selector = '.my-cat';
  const targetSelector = '#sticky-catfish-wrapper';

  function move(el: HTMLElement) {
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;
    target.appendChild(el);
  }

  const observer = new MutationObserver(() => {
    const el = document.querySelector<HTMLElement>(selector);
    if (el) {
      observer.disconnect();
      clearTimeout(timer);
      move(el);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  const timer = setTimeout(() => observer.disconnect(), timeout);
}

function updateStickyHeight() {
  const h = stickyBottomRef.value?.offsetHeight ?? 0;
  document.documentElement.style.setProperty('--sticky-h', `${h}px`);
}

onMounted(async () => {
  moveCatfishToStickyBlock();
  if (stickyBottomRef.value) {
    const resizeObserver = new ResizeObserver(() => {
      updateStickyHeight();
    });
    resizeObserver.observe(stickyBottomRef.value);
    onUnmounted(() => {
      resizeObserver.disconnect();
    });
    updateStickyHeight();
  }
});
</script>

<style lang="scss">
@use "@fc/scss/settings" as *;
.sticky-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  .touchable-content {
    pointer-events: auto;
  }
  &.menu-open {
    .hide-menu-open {
      display: none;
    }
  }
}
.sticky-container__top,
.sticky-container__middle,
.sticky-container__bottom {
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
#sticky-catfish-wrapper {
  z-index: 4;
  width: 100%;
  position: relative;
  pointer-events: auto;
}

#sticky-top {
  z-index: 1;
  pointer-events: none;
  width: 100%;
  position: relative;

  a,
  button {
    pointer-events: auto;
  }

  .mobile-menu-open {
    opacity: 0;
    margin-bottom: 15px;

    &.with-sticky-btn {
      opacity: 1;
    }
  }
}

#sticky-middle-content {
  z-index: 3;
  pointer-events: none;
  width: 100%;
  position: relative;

  a,
  button {
    pointer-events: auto;
  }
}

#cookie-wrapper {
  z-index: 2;
  a,
  button {
    pointer-events: auto;
  }
}

.additional-move-container {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  @media #{$lg} {
    justify-content: center;
  }
}

#sticky-menu {
  z-index: 1000000;
  position: relative;
  width: 100%;
  pointer-events: auto;
}
</style>
