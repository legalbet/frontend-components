<template>
  <div class="mobile-search">
    <form class="mobile-search__form">
      <label class="mobile-search__form-label" for="form-input"></label>
      <input
        class="mobile-search__form-input"
        name="search_query"
        type="text"
        :placeholder="_(Lang.Search)"
        id="form-input"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { Lang } from '@/types/Lang';
import { inject } from 'vue';
import { TRANSLATION_KEY } from '@/types/injection-keys';
const _ = inject(TRANSLATION_KEY, (key: string) => key);
</script>

<style lang="scss" scoped>
@use '@/scss/settings' as *;

.mobile-search {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: rem(13px) rem(14px) rem(32px) rem(14px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: color(white);
  z-index: 112;
  border-top: transparent;
  &__form {
    width: 100%;
    position: relative;
  }
  &__form-label {
    background: url('@/assets/img/menu-search.svg') no-repeat center / contain;
    width: rem(24px);
    height: rem(24px);
    position: absolute;
    top: 50%;
    right: rem(10px);
    margin-top: rem(-12px);
  }

  &__form-input {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: rem(8px) rem(12px);
    border-radius: rem(8px);
    box-shadow: none;
    background: color(light);
    color: color(grey);
    border: 0;
    font-size: rem(14px);
  }
}
</style>
