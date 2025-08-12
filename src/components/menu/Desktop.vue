<template>
  <div :class="['menu-desktop-container']">
    <nav>
      <ul class="menu-desktop">
        <li
          v-for="menuItem in firstLevelItems"
          :class="['menu-desktop__item', activeId && menuItem.id == activeId[0] ? 'active-main-menu-item' : '']"
          :key="menuItem.id"
          :ref="menuItem.id"
          :id="menuItem.id"
          v-show="isVisibleMenuItem(menuItem, currentGeo)"
          @mouseenter="mouseEnterHandler(menuItem)"
          @mouseleave="hideSubMenuWithTimeout"
        >
          <a class="menu-desktop__link" :href="menuItem.url">
            {{ menuItem.title }}
            <!-- TODO перенести стили из site-header -->
            <span v-if="menuItem.title === _(Lang.Daily)" class="red-indicator"></span>
          </a>
          <SubMenu
            :go-back-to-previous-menu="goBackToPreviousMenu"
            :menu-item="menuItem"
            :show-sub-menu-id="showSubMenuId"
            :sub-menu="subMenu"
            :sub-menu-title="subMenuTitle"
            :active-menu-item-id="activeMenuItemId"
            :menu-hover="menuHoverHandler"
            :menu-click="menuClickHandler"
            :is-show-additional-sub-menu="isShowAdditionalSubMenu"
            :menu-position="menuPosition"
            :sub-menu-main-level-length="subMenuMainLevelLength"
            :sub-menu-additional-level-length="subMenuAdditionalLevelLength"
            :current-geo="currentGeo"
            :active-id="activeId"
            :sub-menu-max-height="subMenuMaxHeight"
            :sub-menu-height="subMenuHeight"
          />
        </li>
        <li
          class="menu-desktop__item other"
          v-for="menuItem in menu[1]?.children"
          v-show="isVisibleMenuItem(menuItem, currentGeo)"
          :key="menuItem.id"
          :id="menuItem.id"
          @mouseenter="mouseEnterHandler(menuItem)"
          @mouseleave="hideSubMenuWithTimeout"
        >
          <a class="menu-desktop__link">{{ menuItem.title }}</a>
          <SubMenu
            :go-back-to-previous-menu="goBackToPreviousMenu"
            :menu-item="menuItem"
            :show-sub-menu-id="showSubMenuId"
            :sub-menu="subMenu"
            :sub-menu-title="subMenuTitle"
            :active-menu-item-id="activeMenuItemId"
            :menu-hover="menuHoverHandler"
            :menu-click="menuClickHandler"
            :is-show-additional-sub-menu="isShowAdditionalSubMenu"
            :menu-position="menuPosition"
            :sub-menu-main-level-length="subMenuMainLevelLength"
            :sub-menu-additional-level-length="subMenuAdditionalLevelLength"
            :current-geo="currentGeo"
            :active-id="activeId"
            :sub-menu-max-height="subMenuMaxHeight"
            :sub-menu-height="subMenuHeight"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, onMounted } from 'vue';
import { MenuItemType } from './types';
import SubMenu from './SubMenu.vue';
import { isMenuItemHidden, isVisibleMenuItem } from './utils';
import { Lang } from '../../types/Lang';
const _ = (e: string) => {
  return e;
};

const props = defineProps<{
  menu: MenuItemType[];
  currentGeo: string;
}>();

const showSubMenuId = ref<string | null>(null);
const subMenu = ref<MenuItemType | null>(null);
const activeMenuItemId = ref<string | null>(null);
const menuHistory = ref<MenuItemType[]>([]);
const subMenuLimit = ref<number>(3);
const subMenuTitle = ref<string | null>('');
const isShowAdditionalSubMenu = ref(false);
const menuPosition = ref({});
const subMenuMainLevelLength = ref<number>(0);
const subMenuAdditionalLevelLength = ref<number>(0);
const subMenuMaxHeight = ref('');
const subMenuHeight = ref('');
const MENU_ITEM_GAP = 16;
let hideSubMenuTimeout: number;
const activeId = ref<string[] | null>(null);
const firstLevelItems = computed(() => props.menu[0].children.filter((i) => isVisibleMenuItem(i, props.currentGeo)));

onMounted(() => {
  activeId.value = getActiveMenuItem(props.menu, window.location.pathname);
});
function findAdditionalSubMenu(menuItems: MenuItemType[]) {
  return (isShowAdditionalSubMenu.value = menuItems.some((section) =>
    section.children.some(
      (menu) =>
        menu.children.length &&
        isVisibleMenuItem(menu, props.currentGeo) &&
        menu.children.some((subMenuItem) =>
          subMenuItem.children.some((menuItem) => isVisibleMenuItem(menuItem, props.currentGeo))
        )
    )
  ));
}

function findDefaultShow(menuItems: MenuItemType[]): MenuItemType | null {
  for (const item of menuItems) {
    if (item.isDefaultShow) {
      return item;
    }

    if (item.children.length) {
      let result = findDefaultShow(item.children);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

async function showSubMenuHandler(menuItem: MenuItemType) {
  clearTimeout(hideSubMenuTimeout);
  //При клике на MenuSection, срабатывает Mouseenter, нужно проверка, чтобы это обработать
  if (showSubMenuId.value === menuItem.id) return;

  hideSubMenuHandler();

  if (!menuItem) return;

  showSubMenuId.value = menuItem.id;
  if (!subMenu.value) {
    subMenu.value = findDefaultShow(menuItem.children);
  }

  let childrenCounts = computed(() => {
    return menuItem.children.map((section) => section.children.length);
  });

  subMenuMainLevelLength.value = childrenCounts.value.reduce((acc, val) => acc + val, 0);

  const menuItemElement = document.getElementById(menuItem.id);
  const siteHeaderContainerElement = document.querySelector('.site-menu-container-js');

  if (!(menuItemElement && siteHeaderContainerElement)) return;

  await nextTick();
  const subMenuContainer = menuItemElement?.querySelector('.menu-desktop__sub-menu-container') as HTMLElement;
  const menuWidth = subMenuContainer.offsetWidth;

  const siteHeaderPosition = siteHeaderContainerElement?.getBoundingClientRect();
  const menuItemPosition = menuItemElement?.getBoundingClientRect();
  const menuItemPositionCentre = menuItemPosition?.left + menuItemPosition?.width / 2;
  const newMenuPosition = menuItemPositionCentre - menuWidth / 2;

  menuPosition.value = {
    left: -menuWidth / 2 + menuItemPosition?.width / 2 + 'px',
  };

  if (newMenuPosition < siteHeaderPosition?.left) {
    menuPosition.value = {
      left: -menuWidth / 4 + menuItemPosition?.width / 2 + 'px',
    };
  }

  if (newMenuPosition + menuWidth > siteHeaderPosition?.right) {
    menuPosition.value = {
      right: -menuWidth / 4 + menuItemPosition?.width / 2 + 'px',
    };
  }

  const subMenus = menuItemElement.querySelectorAll('.menu-desktop__sub-menu') as NodeListOf<HTMLElement>;
  const menuItems = subMenus[0].querySelectorAll('.menu-desktop__sub-menu-item') as NodeListOf<HTMLElement>;
  const menuSections = subMenus[0].querySelectorAll('li.menu-desktop__section') as NodeListOf<HTMLElement>;
  const headerHeight = (document.querySelector('.site-header') as HTMLElement)?.offsetHeight;
  const { paddingTop, paddingBottom } = window.getComputedStyle(subMenus[0]);

  const totalSubMenuPadding = parseFloat(paddingTop) + parseFloat(paddingBottom);
  const totalMenuSectionPadding = calcTotalPadding(menuSections);

  const totalPadding = totalSubMenuPadding + totalMenuSectionPadding - MENU_ITEM_GAP;

  const totalHeightMaxLimit = calcTotalHeight(menuItems, 14, totalPadding);
  const totalHeightWithoutLimit = calcTotalHeight(menuItems, undefined, totalPadding);
  const allowedHeightByScreen = document.documentElement.clientHeight - headerHeight;
  const preCalcHeight = menuItems.length >= 14 ? totalHeightMaxLimit : totalHeightWithoutLimit;
  subMenuMaxHeight.value = (preCalcHeight > allowedHeightByScreen ? allowedHeightByScreen : preCalcHeight) + 'px';
  subMenuHeight.value = subMenuMaxHeight.value + 'px';
  subMenuMainLevelLength.value = calcMainMenuLengthItems(menuItems);
}

function calcMainMenuLengthItems(items: NodeListOf<HTMLElement>) {
  return Array.from(items).filter((item) => window.getComputedStyle(item).display !== 'none').length;
}

function calcTotalPadding(items: NodeListOf<HTMLElement>) {
  return Array.from(items).reduce((totalPadding, item) => {
    const { paddingTop, paddingBottom } = window.getComputedStyle(item);
    return totalPadding + parseFloat(paddingTop) + parseFloat(paddingBottom);
  }, 0);
}

function calcTotalHeight(items: NodeListOf<HTMLElement>, limit?: number, totalPadding = 0) {
  const arr = Array.from(items);
  const slicedItems = limit ? arr.slice(0, limit) : arr;

  return slicedItems.reduce((height, item) => {
    const style = window.getComputedStyle(item);
    if (style.display === 'none') return height;
    return height + item.offsetHeight + MENU_ITEM_GAP;
  }, totalPadding);
}
function hideSubMenuHandler() {
  showSubMenuId.value = null;
  subMenu.value = null;
  activeMenuItemId.value = null;
  subMenuTitle.value = null;
}

function hideSubMenuWithTimeout() {
  hideSubMenuTimeout = window.setTimeout(() => {
    hideSubMenuHandler();
  }, 250);
}

function goBackToPreviousMenu() {
  if (menuHistory.value.length && subMenu.value) {
    subMenu.value = menuHistory.value.pop() || null;
    subMenuTitle.value = subMenu.value?.level === subMenuLimit.value ? subMenu.value.title : '';
  } else {
    subMenu.value = null;
    subMenuTitle.value = '';
  }
}

function mouseEnterHandler(menuItem: MenuItemType) {
  showSubMenuHandler(menuItem);
  findAdditionalSubMenu(menuItem.children);
}

function menuClickHandler(menuItem: MenuItemType) {
  if (
    menuItem.level > subMenuLimit.value ||
    menuItem.children.length === 0 ||
    !isMenuItemHidden(menuItem, props.currentGeo)
  ) {
    return;
  }

  if (menuItem.level === subMenuLimit.value && menuItem.children.length) {
    subMenuTitle.value = menuItem.title;
  } else {
    subMenuTitle.value = '';
  }
  if (subMenu.value) {
    if (subMenu.value) menuHistory.value.push(subMenu.value);
  }

  if (menuItem.children.length) {
    subMenu.value = menuItem;
  } else {
    return;
  }
}

function menuHoverHandler(menuItem: MenuItemType) {
  if (menuItem.level > 2) {
    return;
  }

  subMenuTitle.value = '';
  if (menuItem.children.length) {
    subMenu.value = menuItem;
    let childrenCounts = computed(() => {
      return menuItem.children.map((section) => section.children.length);
    });
    subMenuAdditionalLevelLength.value = childrenCounts.value.reduce((acc, val) => acc + val, 0);
  } else {
    const defaultSubMenuValue = props.menu[0].children.find((item) => item.id === showSubMenuId.value);
    if (defaultSubMenuValue) {
      subMenu.value = findDefaultShow(defaultSubMenuValue.children);
    } else {
      subMenu.value = null;
    }
  }

  // Кусочек кода, для того что бы сбрасывать анимацию скролла вверх при наведении на пункт меню
  const subsMenu = document.querySelectorAll('.menu-desktop__sub-menu') as NodeListOf<HTMLElement>;
  if (subsMenu.length) {
    subsMenu.forEach((allSubMenu) => {
      allSubMenu.querySelectorAll('.ps__rail-y').forEach((scroll) => {
        if (scroll) {
          (scroll as HTMLElement).style.top = '0' + 'px';
        }
      });
    });
  }

  activeMenuItemId.value = menuItem.id;
}

function getActiveMenuItem(menuItems: MenuItemType[], currentUrl: string, parents: string[] = []): string[] | null {
  for (const item of menuItems) {
    if (item.url === currentUrl) {
      return item.type === 'menu' ? [...parents, item.id] : parents;
    }

    if (Array.isArray(item.children)) {
      const newParents = item.type === 'menu' ? [...parents, item.id] : parents;
      const result = getActiveMenuItem(item.children, currentUrl, newParents);
      if (result) {
        return result;
      }
    }
  }

  return null;
}
</script>

<style lang="scss">
@use '@/scss/settings' as *;
.menu-desktop-container {
  color: color(black-80);
  font-size: rem(14px);
  font-weight: 600;
  line-height: rem(16px);
}

.menu-desktop-container-white,
//Для black-landing
.black-fixed {
  .menu-desktop__link {
    color: color(white);
  }

  .right-side {
    .icon:before {
      color: color(white);
    }
  }
}

.menu-desktop-container-white:not(.site-header_scrolls) {
  .search-form input,
  .search-form input::placeholder {
    color: color(white);
  }
}

.menu-desktop {
  display: flex;
  gap: rem(24px);

  .menu-desktop__item {
    .icon:before {
      color: color(black-80) !important;
    }
  }

  &__item {
    list-style: none;
    min-height: rem(64px);
    display: flex;
    align-items: center;
    border-top: rem(2px) solid transparent;
    white-space: nowrap;
    position: relative;

    &:hover {
      border-top: rem(2px) solid color(red);
    }
  }

  .other {
    padding-left: rem(15px);
    padding-right: rem(15px);
    display: flex;
    align-items: center;
    justify-content: center;

    .menu-desktop__link {
      position: absolute;
      top: rem(15px);
      font-size: rem(30px);
    }

    &:hover {
      cursor: pointer;
    }

    .active-main-menu-item-other {
      &:before {
        content: '';
        border-left: rem(4px) solid color(red);
        position: absolute;
        height: rem(28px);
        left: 0;
      }
    }
  }

  &__link {
    text-decoration: none;
  }

  &__sub-menu-container {
    display: flex;
    position: absolute;
    top: 100%;
    margin-top: rem(4px);
  }

  &__sub-menu-content {
    min-height: rem(166px);
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: rem(16px);
    box-shadow: 0 rem(8px) rem(14px) 0 rgba(0, 0, 0, 0.1);
  }

  &__sub-menu {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: rem(12px);
    width: rem(333px);
    background-color: color(white);
    padding: rem(24px);
    border-radius: rem(16px);
    min-height: rem(166px);

    .ps__rail-y {
      right: rem(5px);
      margin-top: rem(10px);
      margin-bottom: rem(10px);
    }

    .icon.icon-fire-3-fill.top-match {
      margin-right: rem(-8px);
      &:before {
        font-size: rem(20px);
        color: color(red) !important;
      }
    }
  }

  .test {
    li:last-child {
      margin-bottom: 24px;
    }
  }

  &__sub-menu-scroll {
    &:after {
      content: '';
      position: absolute;
      height: rem(60px);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 80.02%);
      bottom: 0;
      right: 0;
      left: 0;
    }
  }

  &__sub-menu-link-container {
    display: flex;
    align-items: center;
    gap: rem(16px);
    left: 0;

    .icon {
      margin-bottom: 0;
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
  }

  &__sub-menu-link {
    &:hover {
      color: inherit;
    }
  }

  &__sub-menu-label {
    background-color: color(red);
    border-radius: rem(50px);
    text-align: center;
    font-size: rem(14px);
    font-style: normal;
    font-weight: 700;
    line-height: rem(12px);
    letter-spacing: rem(0.7px);
    padding: rem(4px) rem(5px) rem(6px) rem(5px);
    color: color(white);
    white-space: nowrap;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: rem(16px);
    border-bottom: rem(2px) solid color(black-10);
    padding-bottom: rem(13px);

    &:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  &__title-container {
    position: sticky;
    padding: rem(24px) rem(16px) rem(16px);
    height: 100%;
    background-color: color(white);
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: rem(8px);
    font-size: rem(18px);
    font-weight: 700;
    line-height: rem(24px);

    .icon {
      height: rem(28px);
      width: rem(28px);
    }
    .icon.icon-left:before {
      font-size: rem(28px);
      color: color(black);
    }

    &:hover {
      color: color(red);
      cursor: pointer;

      .icon:before {
        color: color(red) !important;
      }
    }
  }

  &__title {
    font-size: rem(16px);
    font-weight: 600;
    line-height: rem(19px);

    &::after {
      content: '';
      display: block;
      height: rem(1px);
      background-color: color(black-10);
      width: rem(333px);
      position: absolute;
      right: 0;
      margin-top: rem(16px);
    }
  }

  &__sub-menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: rem(28px);
    font-weight: 500;
    word-break: break-word;
    white-space: normal;

    .icon.menu-icon:before {
      width: rem(28px);
      height: rem(28px);
      font-size: rem(28px);
      font-style: normal;
      font-weight: 500;
      line-height: rem(12px);
    }

    &:hover {
      color: color(red);
      cursor: pointer;
      .icon:before {
        color: color(red) !important;
      }
      .menu-desktop__sub-menu-label {
        color: color(white);
      }
    }
  }

  .menu-desktop__sub-menu:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: rem(1px) solid color(black-20);
    position: relative;
  }

  .menu-desktop__sub-menu:nth-child(2) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
    padding: 0;
    border: none;
    position: relative;

    ul.menu-desktop__section {
      padding: rem(24px) rem(24px);
      gap: rem(12px);
    }

    li.menu-desktop__section:has(.menu-desktop__title-container) {
      ul.menu-desktop__section {
        padding: 0 rem(24px) rem(24px);
      }
    }
  }

  .menu-desktop__sub-menu.slim-column {
    min-width: rem(248px);
    max-width: rem(333px);
    width: 100%;
    position: relative;
  }

  .menu-desktop__sub-menu:nth-child(1).one-sub-menu {
    border: none;
  }

  .active-menu-item {
    color: color(red);
    .icon:before {
      color: color(red) !important;
    }
    .menu-desktop__sub-menu-label {
      color: color(white);
    }
  }

  .icon-right:before,
  .icon-left:before {
    font-size: rem(18px);
    color: color(black-40);
  }

  .active-main-menu-item {
    border-top: rem(2px) solid color(red);
  }
}

//Всегда показываем скроллбар
.ps__rail-y {
  opacity: 1 !important;
  visibility: visible !important;
}
</style>
