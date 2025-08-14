<template>
  <a class="new-site-logo" :class="{ 'new-year': isNewYear }" href="/">
    <!-- Отдельные теги img нужны, чтобы избежать повторной подгрузки картинок при их смене -->
    <img v-show="showWhiteLogo" :src="LogoWhite" :alt="altText" />

    <!-- Если нужен будет новогодний лого -->
    <!--    <img v-if="isNewYear && !scrollMenu" :src="NewYearLogo" alt="" />-->
    <img v-show="!showWhiteLogo" :src="Logo" :alt="altText" />
  </a>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { LegalEvent } from '@/types/LegalEvents';

import Logo from '@/assets/img/legalbet-logo.svg';
import LogoWhite from '@/assets/img/legalbet-logo-white.svg';
import { Locale } from '@/types/Locale';
import { Lang } from '@/types/Lang';

const props = defineProps<{
  isNewYear?: boolean;
  darkTextTheme?: boolean | null;
  isMenuOpen?: boolean;
  isOpenProfile?: boolean;
}>();

const scrollMenu = ref(false);
const isDarkText = computed(() => props.darkTextTheme);
const isDarkBgWhenScroll = ref(false);
const showWhiteLogo = computed(() => {
  return (
    !props.isMenuOpen && ((isDarkText.value && !scrollMenu.value) || (scrollMenu.value && isDarkBgWhenScroll.value))
  );
});
const altText = ref('');

const setScrollMenu = (e: Event) => {
  const { scroll, needDarkBgWhenScroll } = (e as CustomEvent).detail;
  scrollMenu.value = scroll;
  isDarkBgWhenScroll.value = needDarkBgWhenScroll;
};

onMounted(() => {
  if ((window as any).siteLocale === Locale.KZ) {
    altText.value = Lang.ManinLogoAltText;
  }
  document.addEventListener(LegalEvent.ScrollNewMenuEvent, setScrollMenu);
});

onUnmounted(() => {
  document.removeEventListener(LegalEvent.ScrollNewMenuEvent, setScrollMenu);
});
</script>
<style lang="scss" scoped>
@use '@/scss/settings' as *;
.new-site-logo {
  position: relative;
  margin-top: rem(2px);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-self: center;
  justify-self: center;
  margin-right: rem(24px);
  width: rem(112px);
  height: rem(26px);

  &.new-year {
    height: rem(45px);
  }
}
</style>
