import type { Meta, StoryObj } from '@storybook/vue3';

import BaseDropdown from '@fc/components/dropdown/BaseDropdown.vue';
import BaseDropdownItem from '@fc/components/dropdown/BaseDropdownItem.vue';
import BaseButton from '@fc/components/baseButton/BaseButton.vue';
import { ButtonColor, ButtonShape, ButtonVariant } from '@fc/components/baseButton/types';
import { Size } from '@fc/components/types/BaseElementsType';

const meta = {
  title: 'UI/Dropdown',
  component: BaseDropdown,
  tags: ['autodocs'],
  argTypes: {
    height: { control: { type: 'text' } },
    width: { control: { type: 'text' } },
    activeStyle: { control: { type: 'text' } },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    autoPosition: { control: { type: 'boolean' } },
  },
  args: {
    height: '160px',
    width: '220px',
    activeStyle: '',
    position: 'bottom',
    autoPosition: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=22424-11774&t=393yNUWCOzkMzoNZ-4)',
      },
    },
  },
} satisfies Meta<typeof BaseDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseDropdown, BaseDropdownItem, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 120px; display: flex; justify-content: flex-start;">
        <BaseDropdown v-bind="args">
          <template #active>
            <BaseButton
              :variant="ButtonVariant.Outlined"
              :color="ButtonColor.Tertiary"
              :size="Size.Medium"
              :shape="ButtonShape.Rectangle"
            >
              Open dropdown
            </BaseButton>
          </template>

          <template #items>
            <BaseDropdownItem label="Item 1" />
            <BaseDropdownItem label="Item 2" />
            <BaseDropdownItem label="Item 3" />
            <BaseDropdownItem label="Item 4" />
            <BaseDropdownItem label="Item 5" />
            <BaseDropdownItem label="Item 6" />
            <BaseDropdownItem label="Item 7" />
            <BaseDropdownItem label="Item 8" />
            <BaseDropdownItem label="Item 9" />
            <BaseDropdownItem label="Item 10" />
          </template>
        </BaseDropdown>
      </div>
    `,
  }),
};

export const Positions: Story = {
  args: {
    height: '140px',
    width: '220px',
  },
  render: (args) => ({
    components: { BaseDropdown, BaseDropdownItem, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 160px; display: grid; grid-template-columns: repeat(2, max-content); gap: 40px; align-items: start;">
        <BaseDropdown v-bind="args" position="top">
          <template #active>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">Top</BaseButton>
          </template>
          <template #items>
            <BaseDropdownItem label="Link 1" />
            <BaseDropdownItem label="Link 2" />
            <BaseDropdownItem label="Link 3" />
            <BaseDropdownItem label="Link 4" />
            <BaseDropdownItem label="Link 5" />
          </template>
        </BaseDropdown>

        <BaseDropdown v-bind="args" position="bottom">
          <template #active>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">Bottom</BaseButton>
          </template>
          <template #items>
            <BaseDropdownItem label="Link 1" />
            <BaseDropdownItem label="Link 2" />
            <BaseDropdownItem label="Link 3" />
            <BaseDropdownItem label="Link 4" />
            <BaseDropdownItem label="Link 5" />
          </template>
        </BaseDropdown>

        <BaseDropdown v-bind="args" position="left">
          <template #active>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">Left</BaseButton>
          </template>
          <template #items>
            <BaseDropdownItem label="Link 1" />
            <BaseDropdownItem label="Link 2" />
            <BaseDropdownItem label="Link 3" />
            <BaseDropdownItem label="Link 4" />
            <BaseDropdownItem label="Link 5" />
          </template>
        </BaseDropdown>

        <BaseDropdown v-bind="args" position="right">
          <template #active>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">Right</BaseButton>
          </template>
          <template #items>
            <BaseDropdownItem label="Link 1" />
            <BaseDropdownItem label="Link 2" />
            <BaseDropdownItem label="Link 3" />
            <BaseDropdownItem label="Link 4" />
            <BaseDropdownItem label="Link 5" />
          </template>
        </BaseDropdown>
      </div>
    `,
  }),
};
