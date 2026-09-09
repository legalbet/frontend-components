import type { Meta, StoryObj } from '@storybook/vue3';
import TabsButtons from '@fc/components/tabs/tabsButtons/TabsButtons.vue';
import TabFilter from '@fc/components/tabs/tabsButtons/TabFilter.vue';
import { ref } from 'vue';
import type { TabButtonItem } from './types';
import { IconNames } from '@fc/components/baseIcon/iconNames';
import { Color } from '@fc/components/types/BaseElementsType';

const meta: Meta = {
  computed: {
    Color() {
      return Color;
    },
  },
  title: 'UI/Tabs',
  tags: ['autodocs'],
};

export default meta;

export const TabsButtonsDefault: StoryObj = {
  name: 'TabsButtons / Default',
  render: () => ({
    components: { TabsButtons },
    setup() {
      const modelValue = ref('day');

      const tabs: TabButtonItem[] = [
        { id: 'day', text: 'Tab' },
        { id: 'week', text: 'Tab' },
        { id: 'month', text: 'Tab' },
        { id: 'month123', text: 'Tab', startIconName: 'card-view' },
      ];

      return { tabs, modelValue };
    },
    template: `
      <TabsButtons
        v-model="modelValue"
        :tabs="tabs"
      />
    `,
  }),
};

export const TabsButtonsDark: StoryObj = {
  name: 'TabsButtons / Dark',
  render: () => ({
    components: { TabsButtons },
    setup() {
      const modelValue = ref('day');

      const tabs: TabButtonItem[] = [
        { id: 'day', text: 'Tab' },
        { id: 'week', text: 'Tab' },
        { id: 'month', text: 'Tab', startIconName: 'card-view' },
      ];

      return { tabs, modelValue };
    },
    template: `
      <div style="background-color: rgba(43, 46, 54, 1.00); padding: 20px;">
        <TabsButtons
          v-model="modelValue"
          :tabs="tabs"
          :theme="'dark'"
           :variant="'default'"
        />
      </div>
    `,
  }),
};

export const TabsButtonsSegmented: StoryObj = {
  name: 'TabsButtons / Segmented',
  render: () => ({
    components: { TabsButtons },
    setup() {
      const modelValue = ref('day');

      const tabs: TabButtonItem[] = [
        { id: 'day', text: 'Tab' },
        { id: 'week', text: 'Tab' },
        { id: 'month', text: 'Tab', startIconName: 'card-view' },
      ];

      return { tabs, modelValue };
    },
    template: `
      <div style="background-color: rgba(43, 46, 54, 1.00); padding: 20px;">
      <TabsButtons
        v-model="modelValue"
        :tabs="tabs"
        :variant="'segmented'"
      />
      </div>
    `,
  }),
};

export const TabsButtonsSegmentedDark: StoryObj = {
  name: 'TabsButtons / Segmented dark',
  render: () => ({
    components: { TabsButtons },
    setup() {
      const modelValue = ref('day');

      const tabs: TabButtonItem[] = [
        { id: 'day', text: 'Tab' },
        { id: 'week', text: 'Tab' },
        { id: 'month', text: 'Tab', startIconName: 'card-view' },
      ];

      return { tabs, modelValue };
    },
    template: `
      <div style="background-color: rgba(43, 46, 54, 1.00); padding: 20px;">
        <TabsButtons
          v-model="modelValue"
          :tabs="tabs"
          :variant="'segmented'"
          :theme="'dark'"
        />
      </div>
    `,
  }),
};
export const TabsButtonsSegmentedWhite: StoryObj = {
  name: 'TabsButtons / Segmented white',
  render: () => ({
    components: { TabsButtons },
    setup() {
      const modelValue = ref('day');

      const tabs: TabButtonItem[] = [
        { id: 'day', text: 'Tab' },
        { id: 'week', text: 'Tab' },
        { id: 'month', text: 'Tab', startIconName: 'card-view' },
      ];

      return { tabs, modelValue };
    },
    template: `
      <div style="background-color: rgba(43, 46, 54, 1.00); padding: 20px;">
        <TabsButtons
          v-model="modelValue"
          :tabs="tabs"
          :variant="'segmented'"
          :theme="'white'"
        />
      </div>
    `,
  }),
};

export const TabsButtonsLine: StoryObj = {
  name: 'TabsButtons / Line',
  render: () => ({
    components: { TabsButtons },
    setup() {
      const modelValue = ref('day');

      const tabs: TabButtonItem[] = [
        { id: 'day', text: 'Tab' },
        { id: 'week', text: 'Tab' },
        { id: 'month', text: 'Tab', startIconName: 'card-view' },
      ];

      return { tabs, modelValue };
    },
    template: `
      <TabsButtons
        v-model="modelValue"
        :tabs="tabs"
        :variant="'line'"
      />
    `,
  }),
};

export const TabsButtonsLineDark: StoryObj = {
  name: 'TabsButtons / Line dark',
  render: () => ({
    components: { TabsButtons },
    setup() {
      const modelValue = ref('day');

      const tabs: TabButtonItem[] = [
        { id: 'day', text: 'Tab' },
        { id: 'week', text: 'Tab' },
        { id: 'month', text: 'Tab', startIconName: 'card-view' },
      ];

      return { tabs, modelValue };
    },
    template: `
      <div style="background-color: rgba(43, 46, 54, 1.00); padding: 20px;">
        <TabsButtons
          v-model="modelValue"
          :tabs="tabs"
          :variant="'line'"
          :theme="'dark'"
        />
      </div>
    `,
  }),
};

export const TabsFilter: StoryObj = {
  name: 'TabFilter',
  render: () => ({
    components: { TabFilter },
    setup() {
      const count = ref<number | null>(105);
      const isActive = ref(true);
      const tab = { id: 'filter', startIconName: IconNames.Filter };

      function toggleActive() {
        isActive.value = !isActive.value;
        count.value = isActive.value ? 105 : null;
      }
      return { tab, isActive, count, toggleActive };
    },
    template: `
      <div style="background-color: rgba(43, 46, 54, 1.00); padding: 20px; display: flex">
        <TabFilter :tab="tab" :isActive="isActive" :filterCount="count" @click="toggleActive"/>
      </div>
    `,
  }),
};
