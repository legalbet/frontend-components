<template>
  <li v-for="menuItem in menuProfileItems" :key="menuItem.icon" class="menu-mobile__item">
    <div class="menu-item-container">
      <span :class="`icon ${menuItem.icon} menu-icon`"></span>
      <a class="menu-mobile__link">
        {{ _(menuItem?.label) }}
      </a>
    </div>
  </li>
</template>

<script setup lang="ts">
import { Lang } from '../../../types/Lang';
import { RouteName } from '../../../types/RouteName';
import { MenuItemProfile, User } from '../types';
const _ = (e: string) => e;
const props = defineProps<{
  user: User;
}>();

const menuProfileItems: MenuItemProfile[] = [
  {
    icon: 'icon-user',
    route: RouteName.UserProfileShow,
    label: Lang.MyProfile,
    params: { userid: props.user.id },
  },
  {
    icon: 'icon-mail',
    route: RouteName.Messages,
    label: Lang.Messages,
    params: { userid: props.user.id },
  },
  {
    icon: 'icon-bell',
    route: RouteName.UserNotification,
    label: Lang.Notifications,
  },
  {
    icon: 'icon-blog',
    route: RouteName.UserFeedbackShow,
    label: Lang.EventsFeed,
  },
  {
    icon: 'icon-star',
    route: RouteName.UserFavorite,
    label: Lang.Favourites,
    params: { type: 'blog' },
  },
  { icon: 'icon-gear', route: RouteName.UserSetting, label: Lang.Settings },
  { icon: 'icon-log-out', route: RouteName.Logout, label: Lang.Logout },
];
</script>

<style lang="scss" scoped>
@use '@/scss/settings' as *;

.count_red {
  color: red;
}
</style>
