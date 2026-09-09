<template>
  <BasePopup
    :popupName="PopupName.FilterPopup"
    :hasHeader="true"
    :fixedHeader="true"
    :hasFooter="true"
    :fixedFooter="true"
    customPopupClass="filter-popup"
  >
    <template #title>
      <div class="filter-main__title">
        <BaseIcon :iconName="IconNames.Filter" fontSize="20px" size="20px" textColor="var(--fg-default)" />
        <span>{{ t(Lang.FilterBonuses) }}</span>
      </div>
    </template>
    <template #content>
      <FilterMain v-if="filterProps" v-bind="filterProps" />
    </template>
    <template #footer>
      <div class="filter-popup__footer">
        <BaseButton
          :color="ButtonColor.Tertiary"
          data-testid="filters-clear-bottom"
          :variant="ButtonVariant.Solid"
          class="filter-popup__show-btn"
          :loading="loading"
          :disabled="loading"
          @click="closePopup"
        >
          {{ totalCountText }}
        </BaseButton>
        <BaseButton
          v-if="filterProps?.isAnyChecked"
          :color="ButtonColor.Secondary"
          data-testid="filters-clear-bottom"
          :variant="ButtonVariant.Soft"
          @click.prevent="filterProps?.onResetAll()"
        >
          {{ t(Lang.Reset) }}
        </BaseButton>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import BasePopup from '@fc/components/basePopup/BasePopup.vue';
import type { FilterProps } from '@fc/filter/types';
import { PopupName, type PopupParams } from '@fc/popupsContainer/composables/popupStore/types';
import FilterMain from '@fc/filter/components/FilterMain.vue';
import { usePopupStore } from '@fc/popupsContainer/composables/popupStore/usePopupStore';
import { IconNames } from '@fc/components/baseIcon/iconNames';
import { Lang } from '@fc/types/Lang';
import BaseIcon from '../../components/baseIcon/BaseIcon.vue';
import BaseButton from '@fc/components/baseButton/BaseButton.vue';
import { ButtonColor, ButtonVariant } from '@fc/components/baseButton/types';
import { getPluralFormByCount } from '@fc/utils/getPluralFormByCount';
import { useConfigStore } from '@fc/composables/useConfigStore';

const { t } = useConfigStore();
const configStore = useConfigStore();
const { getActivePopup, closePopup } = usePopupStore();
const popupParams = computed(() => getActivePopup.value?.params as PopupParams[PopupName.FilterPopup] | null);

const filterProps = computed<FilterProps | null>(() => {
  const filterParams = popupParams.value?.filterParams;

  if (!filterParams) {
    return null;
  }

  return {
    filterSections: unref(filterParams.filterSections),
    selected: unref(filterParams.selected),
    onSetFilter: filterParams.onSetFilter,
    onResetAll: filterParams.onResetAll,
    isAnyChecked: unref(filterParams.isAnyChecked),
    hasHeader: false,
    hasFooter: false,
  };
});

const loading = computed(() => unref(popupParams.value?.loading) ?? false);

const totalCountText = computed(() => {
  const count = unref(popupParams.value?.totalCount ?? 0);
  return `${t(Lang.Show)}: ${count} ${getPluralFormByCount(count, t(Lang.BonusBonuses), configStore.locale.value)}`;
});
</script>

<style lang="scss">
@use "@fc/scss/settings" as *;
.filter-popup {
  .filter-main {
    padding: 0;
  }

  .filter-main__body {
    margin: 0;
  }

  .filter-section {
    padding-left: 0;
    padding-right: 0;
    &:first-child {
      padding-top: 0;
      border: none;
    }
  }

  &__footer {
    display: flex;
    gap: rem(12px);
  }

  &__show-btn {
    flex-grow: 1;
  }
}
</style>
