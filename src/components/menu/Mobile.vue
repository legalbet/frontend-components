<template>
  <component
    v-if="menuMobileControlPanelComponent"
    :is="menuMobileControlPanelComponent"
    :user="user"
    :close-menu="closeMenu"
    :open-menu="openMenu"
    :open-profile="openProfile"
    :is-menu-open="isMenuOpen"
  />
  <div v-show="isMenuOpen" class="menu-mobile-container">
    <nav class="menu-mobile-content">
      <ul :class="['menu-mobile', adFox ? 'menu-mobile-adfox' : '']">
        <li v-show="adFox" class="ad-fox" v-html="adFox"></li>
        <li v-if="isProfile" class="menu-mobile__title" @click.prevent="closeMenu">
          <div class="menu-mobile__title-container">
            <span class="icon icon-left"></span>
            {{ user?.username }}
          </div>
        </li>
        <li v-if="menuHistory.length && menuTitle" class="menu-mobile__title" @click="goBack">
          <div class="menu-mobile__title-container">
            <span class="icon icon-left"></span>
            {{ menuTitle }}
          </div>
        </li>
        <component v-if="isProfile && menuProfileComponent" :is="menuProfileComponent" :user="user" />
        <MenuMobileItem
          v-else
          v-for="menuItem in currentMenu"
          :menu-item="menuItem"
          :key="menuItem.id"
          :open-items="openItems"
          :current-geo="currentGeo"
          @menu-click="setSubMenu"
        />
      </ul>
      <MenuMobileSearch />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { MenuItemType, User } from './types';
import MenuMobileItem from './Mobile/MenuMobileItem.vue';
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue';
import MenuMobileSearch from './Mobile/MenuMobileSearch.vue';
import { isVisibleMenuItem } from './utils';

const props = defineProps<{
  menu: MenuItemType[];
  isMenuOpen: boolean;
  adFox: string;
  isProfile: boolean;
  currentGeo: string;
  closeMenu: () => void;
  openMenu: () => void;
  openProfile: () => void;
}>();

const menuMobileControlPanelComponent = shallowRef<ReturnType<typeof defineComponent> | null>(null);
const menuProfileComponent = shallowRef<ReturnType<typeof defineComponent> | null>(null);
const currentMenu = ref<MenuItemType[]>([...props.menu[0]?.children]);
const menuHistory = ref<MenuItemType[][]>([]);
const menuTitleHistory = ref<string[]>([]);
const openItems = ref<Set<string>>(new Set());
const menuTitle = computed(() => {
  return menuTitleHistory.value[menuTitleHistory.value.length - 1];
});
const user = ref<User | null>(null);

onBeforeMount(() => {
  if (window && (window as any).user) {
    user.value = (window as any).user;
  }
});

watchEffect(() => {
  if (!props.isMenuOpen) {
    menuHistory.value = [];
    currentMenu.value = setAllMenu();
  }
});

onMounted(async () => {
  menuMobileControlPanelComponent.value = (await import('./Mobile/MenuMobileControlPanel.vue')).default;
  menuProfileComponent.value = (await import('./Mobile/MenuProfile.vue')).default;

  watch(
    () => props.isMenuOpen,
    (val) => {
      const siteHeader = document.querySelector('.site-header');
      if (val) {
        document.body.style.overflow = 'hidden';
        //Когда открывается мобильное меню хедер всегда должен быть белым с черным текстом и лого.
        siteHeader?.classList.add('white-bg-header');
      } else {
        document.body.style.overflow = '';
        siteHeader?.classList.remove('white-bg-header');
      }
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

function toggleItem(itemId: string) {
  if (openItems.value.has(itemId)) {
    openItems.value.delete(itemId);
  } else {
    openItems.value.add(itemId);
  }
}

function setSubMenu(menuItem: MenuItemType) {
  if (menuItem.level === 3) {
    toggleItem(menuItem.id);
    return;
  }

  if (menuItem.children.length) {
    menuHistory.value.push([...currentMenu.value]);
    menuTitleHistory.value.push(menuItem.title);
    currentMenu.value = menuItem.children.flatMap((section) => section.children);
  }
}

function goBack() {
  if (menuHistory.value.length) {
    currentMenu.value = menuHistory.value.pop()!;
    menuTitleHistory.value.pop();
  }
}

function setAllMenu(): MenuItemType[] {
  const firstMenuItems = props.menu[0]?.children || [];
  let secondMenuItems: MenuItemType[] = [];

  if (props.menu[1]) {
    const shouldShowSecondMenu = isVisibleMenuItem(props.menu[1]?.children[0], props.currentGeo, true);

    if (shouldShowSecondMenu) {
      secondMenuItems =
        props.menu[1]?.children?.flatMap((section) => section?.children?.flatMap((menu) => menu?.children)) || [];
    }
  }

  currentMenu.value = [...firstMenuItems, ...secondMenuItems];

  return currentMenu.value;
}
</script>

<style lang="scss">
@use '@/scss/settings' as *;

.menu-mobile-container {
  font-weight: 500;
  .menu-mobile-content {
    display: flex;
    flex-direction: column;
    background: color(white);

    z-index: 120;
    height: 100vh;
    position: fixed;
    left: 0;
    top: rem(56px);
    width: 100%;
    overflow: scroll;
  }
  .menu-mobile,
  .menu-mobile-adfox {
    display: flex;
    flex-direction: column;
    font-size: rem(16px);
    font-weight: 500;
    line-height: rem(20px);
    color: color(black-80);
    margin-bottom: rem(190px);
    &__title-container {
      display: flex;
      align-items: center;
      gap: rem(16px);
      .icon {
        height: rem(28px);
        width: rem(28px);
      }
      .icon.icon-left:before {
        font-size: rem(28px);
      }
    }

    &__title {
      display: flex;
      align-items: center;
      height: rem(56px);
      font-weight: 700;
      font-size: rem(18px);
      line-height: rem(24px);
      padding-left: rem(16px);
      border-bottom: rem(1px) solid color(black-10);
      background: #f7f7f7;
      position: sticky;
      top: 0;
      z-index: 130;
    }
  }

  .menu-mobile-adfox {
    margin-bottom: rem(250px);
  }
}

.ad-fox {
  min-height: rem(104px);
  .fox {
    border-radius: 0;
    margin-top: 0;
  }
}

.white-bg-header {
  background: color(white) !important;
}
</style>
