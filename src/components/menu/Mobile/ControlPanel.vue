<template>
  <div class="burger-menu-button mobile-only">
    <div v-if="user" class="user-block" @click.stop="openProfile">
      <span id="mobile-profile-menu-user" class="user img-box">
        <img alt="user" v-if="user.avatar" class="account__curcle-pic" style="border-radius: 50%" />

        <span v-else-if="user.username">{{ user.username.slice(0, 2).toUpperCase() }}</span>
      </span>
    </div>
    <a v-else class="signin button" href="#_login">{{ Lang.Login }}</a>
    <div
      :class="['icon', isMenuOpen ? 'icon-close' : 'icon-hamburger']"
      @click="openMenu"
      :data-goal-click="isMenuOpen ? 'click-mob-menu' : undefined"
      :data-goal-param-label="isMenuOpen ? 'click-mob-menu' : undefined"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { Lang } from '@/types/Lang';
import { User } from '@/types/User';

defineProps<{
  isMenuOpen: boolean;
  user?: User;
  closeMenu: () => void;
  openMenu: () => void;
  openProfile: () => void;
}>();
</script>

<style lang="scss">
@use '@/scss/settings' as *;
.burger-menu-button {
  display: flex;
  gap: rem(16px);
  position: absolute;
  right: rem(12px);

  margin-left: rem(12px);
  width: auto;
  height: rem(24px);
  flex-shrink: 0;
  text-align: right;
  align-items: center;
  .icon {
    width: rem(28px);
    height: rem(28px);
    font-size: rem(28px);

    &:before {
      font-size: rem(28px);
      color: color(black);
    }
  }
}

.menu-desktop-container-white,
//Для black-landing
.black-fixed {
  .burger-menu-button {
    .icon:before {
      color: color(white);
    }

    .icon.icon-close {
      &:before {
        color: color(black);
      }
    }
  }
}

.burger-menu-button-white {
  .icon {
    &:before {
      color: color(white);
      font-size: rem(28px);
    }
  }
}

.user {
  margin-left: rem(24px);
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 50%;
  background-image: linear-gradient(135deg, #3023ae, #c86dd7);
  text-align: center;
  color: color(white);
  font-size: 0.9375rem;
  font-weight: 600;
  overflow: visible;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 0.625rem;
    height: 0.625rem;
    border: solid 0.125rem color(light);
    border-radius: 50%;
    background: #a1aab3;
  }
  &.notify:after {
    background: color(red);
  }
}

.account__curcle-pic {
  width: 100%;
  object-fit: cover;
}
</style>
