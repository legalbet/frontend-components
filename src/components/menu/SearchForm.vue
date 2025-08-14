<template>
  <form
    class="search-form"
    :action="route('intell_search.show')"
    :data-search-user-url="route('intell_search.user_select')"
  >
    <div class="icon icon-search"></div>
    <div class="select borderless">
      <input
        class="borderless search-field"
        type="text"
        name="search_query"
        :placeholder="_('Search')"
        autocomplete="on"
      />
      <div class="select-dropdown search-user-select-wrap scroll-content"></div>
    </div>
    <button class="button button--blue" type="submit">
      {{ _('Do search') }}
    </button>
    <span class="icon icon-cross href-link"></span>
  </form>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { TRANSLATION_KEY } from '@/types/injection-keys';
import { route } from '@/components/menu/utils';
const _ = inject(TRANSLATION_KEY, (key: string) => key);
</script>

<style scoped></style>
