<template>
  <div data-test="siteMenu" class="main-menu-container">
    <Logo
      :darkTextTheme="isDarkTheme"
      :isNewYear="data?.is_new_year"
      :isOpenProfile="isProfile"
      :isMenuOpen="isOpenMenu"
    />
    <MenuMobile
      :menu="data?.menu_items"
      :isMenuOpen="isOpenMenu"
      :adFox="adFox"
      :key="data?.menu_items?.length"
      :isProfile="isProfile"
      :closeMenu="closeMenu"
      :openMenu="openMenu"
      :openProfile="openProfile"
      :currentGeo="currentGeo"
    />
    <MenuDesktop :menu="data?.menu_items" :activeId="data?.activeId" :currentGeo="currentGeo" class="desktop-only" />
  </div>
</template>
<script setup lang="ts">
import MenuDesktop from './Desktop.vue';
import { MenuItemType } from './types';
import MenuMobile from './Mobile.vue';

import { onMounted, ref, useAttrs, provide } from 'vue';
import { headerScrollHandler, siteHeaderToTop } from './utils';
import Logo from './Logo.vue';
import { TRANSLATION_KEY, ROUTE_KEY, type TranslationFunction, type RouteFunction } from '@/types/injection-keys';

defineProps<{
  data: {
    menu_items: MenuItemType[];
    is_new_year?: boolean;
    activeId?: string[];
  };
  adFox: string;
  currentGeo: string;
}>();

const attrs = useAttrs();
provide(TRANSLATION_KEY, (attrs?._ as TranslationFunction) ?? ((key: string) => key));
provide(ROUTE_KEY, (attrs?.route as RouteFunction) ?? (() => ''));

const isDarkTheme = ref(false);
const isOpenMenu = ref(false);
const isProfile = ref(false);

const openMenu = () => {
  isOpenMenu.value = !isOpenMenu.value;
  isProfile.value = false;
  siteHeaderToTop(isOpenMenu.value);
};

const openProfile = () => {
  isOpenMenu.value = !isOpenMenu.value;
  isProfile.value = true;
  siteHeaderToTop(isOpenMenu.value);
};

const closeMenu = () => {
  isOpenMenu.value = false;
};

onMounted(() => {
  isDarkTheme.value = document.body.classList.contains('dark-theme-menu-flag');
  headerScrollHandler(isDarkTheme.value);
  document.addEventListener('scroll', () => {
    headerScrollHandler(isDarkTheme.value);
  });
});
</script>

<style lang="scss">
@use '@/scss/settings' as *;
@use './menu.scss' as *;

.main-menu-container {
  display: flex;
  align-items: center;

  .signin.button {
    padding: rem(5px) rem(12px) !important;
    border-radius: rem(26px) !important;
    background: color(red) !important;
    white-space: nowrap !important;
    margin: 0 !important;
  }
}

.mobile-only {
  display: flex !important;
}

.desktop-only {
  display: none !important;
}

@media #{$lg} {
  .mobile-only {
    display: none !important;
  }

  .desktop-only {
    display: flex !important;
  }
}
.site-header.site-header-to-top {
  position: absolute;
  background: color(white);
}
</style>
