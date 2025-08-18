<template>
  <div class="menu-item-container">
    <span
      v-if="menuItem.icon && menuItem.iconPool === MenuIconPool.generalIconPool"
      :class="`icon icon-${menuItem.icon} menu-icon`"
    ></span>
    <img v-if="isImagePool" :class="imgClass" :src="asset(menuItem.icon)" :alt="imgAlt" />
    <a
      :class="['menu-mobile__link', { 'menu-mobile__link--flex': menuItem.title === Lang.Daily }]"
      :style="hasAnyIcon && !menuItem.icon ? 'margin-left: 38px' : ''"
      @click="(event) => navigate(menuItem, event)"
      :href="menuItem.url"
      data-goal-click="conversion-mob-menu"
      data-goal-label="conversion-mob-menu"
      :data-goal-param-link="menuItem?.url"
    >
      {{ menuItem.title }}
      <span v-if="menuItem.title === Lang.Daily" class="red-indicator"></span>
    </a>
    <span v-if="menuItem.status" class="menu-desktop__sub-menu-label"> {{ menuItem.status }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MenuIconPool, MenuItemType } from '../types';
import { Lang } from '@/types/Lang';
import { asset } from '../utils';
const { menuItem, hasAnyIcon } = defineProps<{
  menuItem: MenuItemType;
  hasAnyIcon?: boolean;
}>();

const isImagePool = computed(() =>
  Boolean(
    menuItem.icon &&
      (menuItem.iconPool === MenuIconPool.bkIconPool ||
        menuItem.iconPool === MenuIconPool.casinoIconPool ||
        menuItem.iconPool === MenuIconPool.tournamentsIconPool)
  )
);

const imgClass = computed(() =>
  menuItem.iconPool === MenuIconPool.tournamentsIconPool ? 'img-icon-tournament' : 'img-icon'
);

const imgAlt = computed(() =>
  menuItem.iconPool === MenuIconPool.tournamentsIconPool ? menuItem.icon : menuItem.title
);

const navigate = (menuItem: MenuItemType, event: Event) => {
  if (menuItem.children && menuItem.children.length) {
    event.preventDefault();
  }
};
</script>

<style lang="scss">
@use '@/scss/settings' as *;

.menu-item-container {
  display: flex;
  align-items: center;
  gap: rem(10px);

  .icon {
    height: rem(28px);
    width: rem(28px);
  }
  .icon:before {
    font-size: rem(28px);
  }
}

.submenu__item {
  padding-left: rem(32px);
  border-bottom: rem(1px) solid color(black-10);
  background: color(black-3);
}
.img-icon {
  width: rem(24px);
  height: rem(24px);
  border-radius: rem(2px);
}

.img-icon-tournament {
  width: rem(24px);
  height: rem(18px);
  border-radius: rem(2px);
}

.menu-mobile__link--flex {
  display: flex;
}
</style>
