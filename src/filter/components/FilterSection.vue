<template>
  <section class="filter-section">
    <div class="filter-section__head" :class="{ 'cursor-pointer': !section?.tooltipHidden && section?.tooltipText }">
      <div class="filter-section__title">
        <span v-if="!section.nameHidden">{{ section.name }}</span>
      </div>
      <!--      TODO Тут логика правильная, но с бэка даже пустые статик блоки приходят в служебной обертке - надо фиксить там-->
      <BaseIcon
        v-if="!section.tooltipHidden && section.tooltipText"
        :iconName="IconNames.CircleE"
        size="20px"
        fontSize="20px"
        :textColor="tooltipIconColor"
        @click="toggleTooltipVisibility"
      />
    </div>

    <div
      v-if="!section.tooltipHidden && section.tooltipText && isTooltipVisible"
      class="filter-section__tooltip"
      v-html="section.tooltipText"
    ></div>

    <div class="filter-section__body" :class="{ 'without-title': section.nameHidden }">
      <div class="filter-section__checkbox-list">
        <FilterCheckboxItem v-for="filter in uiFilters" :key="filter.systemName" :filter="filter" @toggle="onToggle" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref computed } from 'vue';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import { IconNames } from '@fc/components/baseIcon/iconNames';
import type { NewFilterSectionType, UiFilterItem, SelectedFilters } from '@fc/filter/types';
import FilterCheckboxItem from '@fc/filter/components/FilterCheckboxItem.vue';

const props = defineProps<{
  section: NewFilterSectionType;
  selected: SelectedFilters;
  onSetFilter: (sectionSystemName: string, filterId: number, checked: boolean) => void;
}>();

const isTooltipVisible = ref(false);
const tooltipIconColor = computed(() => (isTooltipVisible.value ? 'var(--fg-hover)' : 'var(--fg-muted)'));

const checkedIds = computed<number[]>(() => props.selected[props.section.systemName] ?? []);

const checkedSet = computed(() => new Set(checkedIds.value));

function isChecked(id: number) {
  return checkedSet.value.has(id);
}

const uiFilters = computed<UiFilterItem[]>(() => {
  return props.section.filters.map(({ filter: f }) => ({
    id: f.id,
    name: f.name,
    count: f.entityCount,
    disabled: f.entityCount === 0,
    img: f.iconSvg,
    checked: isChecked(f.id),
    systemName: f.systemName,
  }));
});

function onToggle(payload: { id: number; checked: boolean }) {
  props.onSetFilter(props.section.systemName, payload.id, payload.checked);
}

function toggleTooltipVisibility() {
  isTooltipVisible.value = !isTooltipVisible.value;
}
</script>

<style scoped lang="scss">
@use "@fc/scss/settings" as *;
.filter-section {
  padding: var(--padding-base) var(--padding-base) 0;
  border-top: rem(1px) solid var(--border-divider);
  overflow: hidden;

  & + & {
    margin-top: var(--padding-base);
  }

  &__head {
    width: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: rem(12px);
  }

  &__title {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__tooltip {
    margin-top: rem(12px);
    padding: rem(8px);
    border-radius: var(--radius-button-32);
    background: var(--secondary-container);
    font-size: rem(12px);
    line-height: 16px;
  }

  &__body {
    margin-top: rem(20px);
    &.without-title {
      margin-top: 0;
    }
  }

  &__checkbox-list {
    display: flex;
    flex-direction: column;
    gap: rem(16px);
  }
}
</style>
