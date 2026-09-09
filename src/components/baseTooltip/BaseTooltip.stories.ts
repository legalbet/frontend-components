import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import BaseTooltip from '@fc/components/baseTooltip/baseTooltip.vue';
import BaseButton from '@fc/components/baseButton/BaseButton.vue';
import { ButtonColor, ButtonShape, ButtonVariant } from '@fc/components/baseButton/types';
import { Size } from '@fc/components/types/BaseElementsType';

const meta = {
  title: 'UI/Tooltip',
  component: BaseTooltip,
  tags: ['autodocs'],
  argTypes: {
    text: { control: { type: 'text' } },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click', 'manual'],
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
    offset: { control: { type: 'number' } },
    openDelay: { control: { type: 'number' } },
    closeDelay: { control: { type: 'number' } },
    disabled: { control: { type: 'boolean' } },
    teleport: { control: { type: 'boolean' } },
    zIndex: { control: { type: 'number' } },
    arrow: { control: { type: 'boolean' } },
    closeOnClickOutside: { control: { type: 'boolean' } },
    closeOnEsc: { control: { type: 'boolean' } },
    interactive: { control: { type: 'boolean' } },
    fullWidth: { control: { type: 'boolean' } },
    dark: { control: { type: 'boolean' } },
    open: {
      control: { type: 'boolean' },
      description: 'Controlled mode. Use together with trigger="manual" in real usage.',
    },
    defaultOpen: { control: { type: 'boolean' } },
  },
  args: {
    text: 'Tooltip text',
    trigger: 'hover',
    placement: 'top',
    align: 'center',
    offset: 8,
    openDelay: 100,
    closeDelay: 100,
    disabled: false,
    teleport: true,
    zIndex: 10000,
    arrow: true,
    closeOnClickOutside: true,
    closeOnEsc: true,
    interactive: true,
    fullWidth: false,
    dark: true,
    defaultOpen: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=1172-33753&t=tYrngOASHX4QUe7i-4)',
      },
    },
  },
} satisfies Meta<typeof BaseTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseTooltip, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <BaseTooltip v-bind="args">
          <template #trigger>
            <BaseButton
              :variant="ButtonVariant.Contained"
              :color="ButtonColor.Primary"
              :size="Size.Medium"
              :shape="ButtonShape.Rectangle"
            >
              Hover me
            </BaseButton>
          </template>
        </BaseTooltip>
      </div>
    `,
  }),
};

export const Dark: Story = {
  args: {
    dark: true,
    text: 'Dark tooltip',
  },
  render: (args) => ({
    components: { BaseTooltip, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: inline-flex; background: #111827;">
        <BaseTooltip v-bind="args">
          <template #trigger>
            <BaseButton
              :variant="ButtonVariant.Outlined"
              :color="ButtonColor.Tertiary"
              :size="Size.Medium"
              :shape="ButtonShape.Rectangle"
            >
              Hover me
            </BaseButton>
          </template>
        </BaseTooltip>
      </div>
    `,
  }),
};

export const FullWidthTrigger: Story = {
  args: {
    fullWidth: true,
    text: 'Tooltip for full-width trigger',
    placement: 'bottom',
  },
  render: (args) => ({
    components: { BaseTooltip, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 40px; width: 360px; background: #fff;">
        <BaseTooltip v-bind="args">
          <template #trigger>
            <BaseButton
              style="width: 100%;"
              :variant="ButtonVariant.Contained"
              :color="ButtonColor.Primary"
              :size="Size.Medium"
              :shape="ButtonShape.Rectangle"
            >
              Full width button
            </BaseButton>
          </template>
        </BaseTooltip>
      </div>
    `,
  }),
};

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    text: 'Tooltip opens on click',
  },
  render: (args) => ({
    components: { BaseTooltip, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <BaseTooltip v-bind="args">
          <template #trigger>
            <BaseButton
              :variant="ButtonVariant.Outlined"
              :color="ButtonColor.Tertiary"
              :size="Size.Medium"
              :shape="ButtonShape.Rectangle"
            >
              Click me
            </BaseButton>
          </template>
        </BaseTooltip>
      </div>
    `,
  }),
};

export const ManualControlled: Story = {
  args: {
    trigger: 'manual',
    text: 'Controlled tooltip',
  },
  render: (args) => ({
    components: { BaseTooltip, BaseButton },
    setup() {
      const open = ref(false);
      return { args, open, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <BaseButton
          :variant="ButtonVariant.Contained"
          :color="ButtonColor.Primary"
          :size="Size.Medium"
          :shape="ButtonShape.Rectangle"
          @click="open = !open"
        >
          Toggle tooltip
        </BaseButton>

        <BaseTooltip v-bind="args" v-model:open="open">
          <template #trigger>
            <BaseButton
              :variant="ButtonVariant.Outlined"
              :color="ButtonColor.Secondary"
              :size="Size.Medium"
              :shape="ButtonShape.Rectangle"
            >
              Anchor
            </BaseButton>
          </template>
        </BaseTooltip>
      </div>
    `,
  }),
};

export const SlotContent: Story = {
  args: {
    text: '',
    placement: 'right',
    trigger: 'hover',
  },
  render: (args) => ({
    components: { BaseTooltip, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <BaseTooltip v-bind="args">
          <template #trigger>
            <BaseButton
              :variant="ButtonVariant.Contained"
              :color="ButtonColor.Secondary"
              :size="Size.Medium"
              :shape="ButtonShape.Rectangle"
            >
              Hover for rich content
            </BaseButton>
          </template>

          <template #content>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <div style="font-weight: 700;">Title</div>
              <div style="opacity: 0.9;">Any HTML / components here.</div>
              <div style="opacity: 0.8; font-size: 12px;">Try interactive hover: move cursor onto tooltip.</div>
            </div>
          </template>
        </BaseTooltip>
      </div>
    `,
  }),
};

export const Placements: Story = {
  render: () => ({
    components: { BaseTooltip, BaseButton },
    setup() {
      return { ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 120px; display: grid; grid-template-columns: repeat(2, max-content); gap: 24px;">
        <BaseTooltip text="Top" placement="top">
          <template #trigger>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">
              Top
            </BaseButton>
          </template>
        </BaseTooltip>

        <BaseTooltip text="Right" placement="right">
          <template #trigger>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">
              Right
            </BaseButton>
          </template>
        </BaseTooltip>

        <BaseTooltip text="Bottom" placement="bottom">
          <template #trigger>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">
              Bottom
            </BaseButton>
          </template>
        </BaseTooltip>

        <BaseTooltip text="Left" placement="left">
          <template #trigger>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">
              Left
            </BaseButton>
          </template>
        </BaseTooltip>
      </div>
    `,
  }),
};
