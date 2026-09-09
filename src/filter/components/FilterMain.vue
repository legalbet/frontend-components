<template>
  <div class="filter-main">
    <div v-if="hasHeader" class="filter-main__header">
      <div class="filter-main__title">
        <BaseIcon :iconName="IconNames.Filter" fontSize="20px" size="20px" textColor="var(--fg-default)" />
        <span>{{ t(Lang.FilterBonuses) }}</span>
      </div>

      <div class="filter-main__actions">
        <BaseLink
          :urlParams="{
            url: '#',
            external: true,
          }"
          :size="Size.Small"
          data-testid="filters-clear"
          :disabled="!isAnyChecked"
          @click.prevent="handleResetAll"
        >
          {{ t(Lang.Reset) }}
        </BaseLink>
      </div>
    </div>

    <div class="filter-main__body">
      <div v-if="filterSections" class="filter-sidebar__groups">
        <FilterSection
          v-for="section in visibleSections"
          :key="section.systemName"
          :section="section"
          :selected="selected"
          :onSetFilter="onSetFilter"
        >
        </FilterSection>
      </div>
    </div>

    <div v-if="hasFooter" class="filter-main__footer">
      <BaseLink
        :urlParams="{
          url: '#',
          external: true,
        }"
        :size="Size.Small"
        data-testid="filters-clear-bottom"
        :disabled="!isAnyChecked"
        @click.prevent="handleResetAll"
      >
        {{ t(Lang.Reset) }}
      </BaseLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Lang } from '@/types/Lang';
import FilterSection from '@/filter/components/FilterSection.vue';
import type { FilterProps, NewFilterSectionType } from '@/filter/types';
import BaseIcon from '@/components/baseIcon/BaseIcon.vue';
import BaseLink from '@/components/BaseLink.vue';
import { IconNames } from '@/components/baseIcon/iconNames';
import { Size } from '@/components/types/BaseElementsType';
import { useConfigStore } from '@/composables/useConfigStore';

const { t } = useConfigStore();
const props = withDefaults(defineProps<FilterProps>(), {
  hasHeader: true,
  hasFooter: true,
});

const visibleSections = computed<NewFilterSectionType[]>(() => {
  return Object.values(props.filterSections);
});

function handleResetAll() {
  if (!props.isAnyChecked) return;
  props.onResetAll();
}
</script>

<style lang="scss">
@use "@/scss/settings" as *;
.filter-main {
  padding: var(--padding-base) 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border-radius: var(--radius-base);

  &__header {
    padding: 0 var(--padding-base);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: rem(8px);
  }

  &__title {
    display: flex;
    align-items: center;
    gap: rem(8px);
    font-size: rem(16px);
    line-height: rem(18px);
    color: var(--fg-default);
    font-weight: 600;
    text-overflow: ellipsis;
  }

  &__actions {
    display: inline-flex;
    gap: rem(8px);
  }

  &__body {
    margin-top: var(--padding-base);
    display: flex;
    flex-direction: column;
  }

  &__footer {
    border-top: 1px solid var(--border-divider);
    margin-top: var(--padding-base);
    padding: var(--padding-base) var(--padding-base) 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
