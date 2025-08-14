<template>
  <div :class="['menu-desktop__sub-menu-container']" :style="menuPosition">
    <div class="menu-desktop__sub-menu-content" :style="{ height: subMenuMaxHeight, zIndex: 1000 }">
      <ul
        :class="[
          'menu-desktop__sub-menu',
          { 'one-sub-menu ': !isShowAdditionalSubMenu },
          {
            'slim-column': Object.keys(menuItem).includes('slimColumn') ? menuItem?.slimColumn : false,
          },
        ]"
        v-show="isMainContainerVisible"
        ref="perfectScrollBarElementMain"
      >
        <li class="menu-desktop__section" v-for="sectionItem in menuItem.children" :key="sectionItem.id">
          <MenuSection
            :activeMenuItemId="activeMenuItemId"
            :sectionItem="sectionItem"
            :currentGeo="currentGeo"
            :activeId="activeId"
            @menuHover="menuHover"
            @menuClick="menuClick"
            :data-test-menu-level="'second-level--' + menuItem?.url"
          />
        </li>
      </ul>
      <ul class="menu-desktop__sub-menu" v-show="isSubContainerVisible" ref="perfectScrollBarElementSub">
        <li class="menu-desktop__section" v-for="sectionItem in subMenu?.children" :key="sectionItem.id">
          <div v-if="subMenuTitle" @click="goBackToPreviousMenu" class="menu-desktop__title-container">
            <span class="icon icon-left"></span>
            <span class="menu-desktop__title">{{ subMenuTitle }}</span>
          </div>
          <MenuSection
            :activeMenuItemId="activeMenuItemId"
            :sectionItem="sectionItem"
            :currentGeo="currentGeo"
            :activeId="activeId"
            @menuHover="menuHover"
            @menuClick="menuClick"
            :data-test-menu-level="'third-level--' + subMenu?.url"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuSection from './Section.vue';
import { MenuItemType } from './types';
import { computed, onMounted, ref } from 'vue';
import { isMenuItemHidden } from './utils';
import { usePerfectScrollbar } from '@/composables/usePerfectScrollbar';
const props = defineProps<{
  menuItem: MenuItemType;
  showSubMenuId?: string | null;
  subMenuTitle: string | null;
  subMenu?: MenuItemType | null;
  goBackToPreviousMenu?: () => void;
  activeMenuItemId?: string | null;
  menuClick: (item: MenuItemType) => void;
  menuHover: (item: MenuItemType) => void;
  isShowAdditionalSubMenu?: boolean;
  menuPosition?: any;
  subMenuMainLevelLength: number;
  subMenuAdditionalLevelLength: number;
  currentGeo: string;
  activeId: string[] | null;
  subMenuHeight: string;
  subMenuMaxHeight: string;
}>();

const perfectScrollBarElementMain = ref<HTMLElement | null>(null);
const isMainContainerVisible = computed(
  () => props.showSubMenuId == props.menuItem.id && isMenuItemHidden(props.menuItem.children, props.currentGeo)
);
const perfectScrollBarElementSub = ref<HTMLElement | null>(null);
const isSubContainerVisible = computed(() => props.showSubMenuId == props.menuItem.id && props.isShowAdditionalSubMenu);

onMounted(() => {
  usePerfectScrollbar(perfectScrollBarElementMain, isMainContainerVisible);
  usePerfectScrollbar(perfectScrollBarElementSub, isSubContainerVisible);
});
</script>
