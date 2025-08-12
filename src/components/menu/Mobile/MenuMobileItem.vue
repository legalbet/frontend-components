<template>
  <li
    class="menu-mobile__item"
    @click="
      setSubMenu(menuItem);
      navigateTo(menuItem);
    "
    v-show="isVisibleMenuItem(menuItem, currentGeo, true)"
  >
    <MobileItemContainer :menu-item="menuItem" />
    <span :class="['control-icons']">
      <span v-if="menuItem.children.length && isMenuItemHidden(menuItem, props.currentGeo) && menuItem.level === 3">
        <span v-if="isOpen" class="icon icon-up"></span>
        <span v-else class="icon icon-down"></span>
      </span>
      <span v-if="menuItem.level !== 3 && menuItem.children.length" class="icon icon-right"></span>
    </span>
  </li>
  <ul v-show="menuItem.children.length && isOpen" class="sub-menu">
    <li
      v-for="child in menuItem.children.flatMap((section) => section.children)"
      :key="child.id"
      class="submenu__item"
      v-show="isVisibleMenuItem(child, currentGeo, true)"
      @click.stop="
        setSubMenu(child);
        navigateTo(child);
      "
    >
      <MobileItemContainer :menu-item="child" :has-any-icon="hasAnyIcon" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { MenuItemType } from '../types';
import { computed } from 'vue';
import MobileItemContainer from './MenuMobileItemContainer.vue';
import { isMenuItemHidden, isVisibleMenuItem } from '../utils';

const props = defineProps<{
  menuItem: MenuItemType;
  openItems: Set<string>;
  currentGeo: string;
}>();

const emits = defineEmits<{
  'menu-click': [item: MenuItemType];
}>();

const isOpen = computed(() => props.openItems.has(props.menuItem.id));

const setSubMenu = (menuItem: MenuItemType) => {
  emits('menu-click', menuItem);
};
const hasAnyIcon = computed(() =>
  props.menuItem.children.flatMap((section) => section.children).some((menu) => menu.icon)
);

const navigateTo = (menuItem: MenuItemType) => {
  if (menuItem.children.length || !menuItem.url) {
    return;
  }

  window.location.href = menuItem.url;
};
</script>

<style lang="scss">
@use '@/scss/settings' as *;
.menu-mobile {
  &__item,
  .submenu__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: rem(16px);
    background: color(white);
    border-bottom: rem(1px) solid color(black-10);
    height: rem(50px);

    .icon:before {
      color: color(black-80) !important;
    }

    .icon.icon-fire-3-fill.top-match {
      margin-right: rem(-8px);
      &:before {
        font-size: rem(20px);
        color: color(red) !important;
      }
    }
  }

  .control-icons {
    color: color(black-40);
  }
  .control-icons.icon:before {
    font-size: rem(18px);
  }

  .submenu__item {
    justify-content: flex-start;
    padding-left: rem(16px);
    border-bottom: rem(1px) solid color(black-10);
    background: color(black-3);
  }
}
</style>
