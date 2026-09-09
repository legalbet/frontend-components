<script lang="ts" setup>
import BaseLink from '@/components/BaseLink.vue';
import BaseLoader from '@/components/basePreloader/BaseLoader.vue';

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    title?: string;
  }>(),
  {
    title: 'Показать еще',
  }
);

const { isMobile } = useDevice();
</script>
<template>
  <div class="base-more-button">
    <BaseLink :urlParams="{ url: 'javascript:void(0)', external: false }" :loading="props.loading">
      <BaseLoader v-if="props.loading" :size="isMobile ? '2rem' : '2.8rem'" />
      <span v-else>{{ props?.title }}</span>
    </BaseLink>
  </div>
</template>
<style lang="scss">
@use "@/scss/settings" as *;
.base-more-button {
  display: flex;
  justify-content: center;
  width: 100%;
  height: rem(68px);
  padding: var(--padding-base, 16px);
  align-items: center;
  cursor: pointer;

  border-radius: var(--radius-base, 8px);
  background: var(--bg-surface, #fff);

  @media #{$md_max} {
    height: rem(52px);
  }
}
</style>
