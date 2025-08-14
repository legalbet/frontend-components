<template>
  <ul class="menu-desktop__section">
    <li
      v-for="menuSubItem in sectionItem.children"
      v-show="isVisibleMenuItem(menuSubItem, props.currentGeo)"
      :key="menuSubItem.id"
      :class="[
        'menu-desktop__sub-menu-item',
        {
          'active-menu-item': activeMenuItemId == menuSubItem?.id,
          'active-main-menu-item-other': activeId && activeId[1] == menuSubItem?.id,
        },
      ]"
      @mouseenter="menuHover(menuSubItem)"
      @click="
        menuClick(menuSubItem);
        navigateTo(menuSubItem);
      "
    >
      <div class="menu-desktop__sub-menu-link-container">
        <span
          v-if="menuSubItem.icon && menuSubItem.iconPool === MenuIconPool.generalIconPool"
          :class="`icon icon-${menuSubItem.icon} menu-icon`"
        ></span>
        <img
          class="img-icon"
          v-if="menuSubItem.icon && menuSubItem.iconPool === MenuIconPool.bkIconPool"
          :alt="menuSubItem.title"
        />
        <img
          class="img-icon"
          v-if="menuSubItem.icon && menuSubItem.iconPool === MenuIconPool.casinoIconPool"
          :alt="menuSubItem.title"
        />
        <img
          class="img-icon-tournament"
          v-if="menuSubItem.icon && menuSubItem.iconPool === MenuIconPool.tournamentsIconPool"
          :src="menuSubItem.icon"
          :alt="menuSubItem.icon"
        />
        <a
          :style="hasAnyIcon && !menuSubItem.icon ? 'margin-left: 40px' : ''"
          class="menu-desktop__sub-menu-link"
          :href="menuSubItem.url"
          @click="(event) => navigate(menuSubItem, event)"
        >
          {{ menuSubItem.title }}
        </a>
        <span v-show="menuSubItem.status" class="menu-desktop__sub-menu-label">{{ menuSubItem.status }}</span>
      </div>
      <span
        v-if="menuSubItem.children.length && isMenuItemHidden(menuSubItem.children, props.currentGeo)"
        class="icon icon-right"
      ></span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { MenuIconPool, MenuItemType } from './types';
import { isMenuItemHidden, isVisibleMenuItem } from './utils';
import { computed } from 'vue';

const props = defineProps<{
  sectionItem: MenuItemType;
  activeMenuItemId?: string | null;
  currentGeo: string;
  activeId: string[] | null;
}>();

const emits = defineEmits<{
  'menu-click': [item: MenuItemType];
  'menu-hover': [item: MenuItemType];
  'hidde-sub-menu': [];
}>();
const menuHover = (menuSubItem: MenuItemType) => {
  emits('menu-hover', menuSubItem);
};

const menuClick = (menuSubItem: MenuItemType) => {
  emits('menu-click', menuSubItem);
};

const navigate = (menuItem: MenuItemType, event: Event) => {
  if (menuItem.children && menuItem.children.length) {
    event.preventDefault();
  }
};

const navigateTo = (menuItem: MenuItemType) => {
  if (menuItem.level >= 3 || !menuItem.url) {
    return;
  }

  window.location.href = menuItem.url;
};

const hasAnyIcon = computed(() => props.sectionItem.children.some((item) => item.icon));
</script>
