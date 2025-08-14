<template>
  <li v-for="menuItem in menuProfileItems" :key="menuItem.icon" class="menu-mobile__item">
    <div class="menu-item-container">
      <span :class="`icon ${menuItem.icon} menu-icon`"></span>
      <a class="menu-mobile__link" :href="route(menuItem.route, { ...menuItem.params })">
        {{ _(menuItem.label) }}
      </a>
    </div>
  </li>
</template>

<script setup lang="ts">
import { Lang } from '@/types/Lang';
import { RouteName } from '@/types/RouteName';
import { MenuItemProfile, User } from '@/components/menu/types';
import { inject, computed } from 'vue';
import { TRANSLATION_KEY, ROUTE_KEY } from '@/types/injection-keys';

const _ = inject(TRANSLATION_KEY, (key: string) => key);

const route = inject(ROUTE_KEY, () => '');

const props = defineProps<{
  user: User | null;
}>();

const menuProfileItems = computed((): MenuItemProfile[] => [
  {
    icon: 'icon-user',
    route: RouteName.UserProfileShow,
    label: Lang.MyProfile,
    params: { userid: props.user?.id || 0 },
  },
  {
    icon: 'icon-mail',
    route: RouteName.Messages,
    label: Lang.Messages,
    params: { userid: props.user?.id || 0 },
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
]);
</script>

<style lang="scss" scoped>
@use '@/scss/settings' as *;

.count_red {
  color: red;
}
</style>
