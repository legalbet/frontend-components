import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import BasePopover from '@/components/basePopover/BasePopover.vue';
import BaseButton from '@/components/baseButton/BaseButton.vue';
import { ButtonColor, ButtonShape, ButtonVariant } from '@/components/baseButton/types';
import { Size } from '@/components/types/BaseElementsType';

const meta = {
  title: 'UI/Popover',
  component: BasePopover,
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
    closeIcon: { control: { type: 'boolean' } },
    closeOnClickOutside: { control: { type: 'boolean' } },
    closeOnEsc: { control: { type: 'boolean' } },
    interactive: { control: { type: 'boolean' } },
    fullWidth: { control: { type: 'boolean' } },
    open: {
      control: { type: 'boolean' },
      description: 'Controlled mode. Use together with trigger="manual".',
    },
    defaultOpen: { control: { type: 'boolean' } },
  },
  args: {
    text: 'Popover content text',
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
    closeIcon: true,
    closeOnClickOutside: true,
    closeOnEsc: true,
    interactive: true,
    fullWidth: false,
    defaultOpen: false,
  },
} satisfies Meta<typeof BasePopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { BasePopover, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <BasePopover v-bind="args">
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
        </BasePopover>
      </div>
    `,
  }),
};

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    text: 'Click popover content',
    closeIcon: true,
  },
  render: (args) => ({
    components: { BasePopover, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <BasePopover v-bind="args">
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
        </BasePopover>
      </div>
    `,
  }),
};

export const ManualControlled: Story = {
  args: {
    trigger: 'manual',
    text: 'Controlled popover',
    closeIcon: false,
  },
  render: (args) => ({
    components: { BasePopover, BaseButton },
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
          Toggle popover
        </BaseButton>

        <BasePopover v-bind="args" v-model:open="open">
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
        </BasePopover>
      </div>
    `,
  }),
};

export const SlotContent: Story = {
  args: {
    text: '',
    placement: 'right',
    trigger: 'click',
    closeIcon: false,
  },
  render: (args) => ({
    components: { BasePopover, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <BasePopover v-bind="args">
          <template #trigger>
            <BaseButton
              :variant="ButtonVariant.Contained"
              :color="ButtonColor.Secondary"
              :size="Size.Medium"
              :shape="ButtonShape.Rectangle"
            >
              Click for rich content
            </BaseButton>
          </template>

          <template #content>
            <div style="display: flex; flex-direction: column; gap: 6px; min-width: 200px;">
              <div style="font-weight: 700; font-size: 14px;">Title</div>
              <div style="opacity: 0.8; font-size: 13px;">Any HTML or components here.</div>
              <div style="opacity: 0.6; font-size: 12px;">Hover inside to stay open.</div>
            </div>
          </template>
        </BasePopover>
      </div>
    `,
  }),
};

export const NoArrow: Story = {
  args: {
    arrow: false,
    closeIcon: false,
    text: 'No arrow popover',
  },
  render: (args) => ({
    components: { BasePopover, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <BasePopover v-bind="args">
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
        </BasePopover>
      </div>
    `,
  }),
};

export const Placements: Story = {
  render: () => ({
    components: { BasePopover, BaseButton },
    setup() {
      return { ButtonVariant, ButtonColor, ButtonShape, Size };
    },
    template: `
      <div style="padding: 120px; display: grid; grid-template-columns: repeat(2, max-content); gap: 24px;">
        <BasePopover text="Top" placement="top" :close-icon="false">
          <template #trigger>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">Top</BaseButton>
          </template>
        </BasePopover>

        <BasePopover text="Right" placement="right" :close-icon="false">
          <template #trigger>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">Right</BaseButton>
          </template>
        </BasePopover>

        <BasePopover text="Bottom" placement="bottom" :close-icon="false">
          <template #trigger>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">Bottom</BaseButton>
          </template>
        </BasePopover>

        <BasePopover text="Left" placement="left" :close-icon="false">
          <template #trigger>
            <BaseButton :variant="ButtonVariant.Outlined" :color="ButtonColor.Tertiary" :size="Size.Medium" :shape="ButtonShape.Rectangle">Left</BaseButton>
          </template>
        </BasePopover>
      </div>
    `,
  }),
};
