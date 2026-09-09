import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import DefaultPopover from '@fc/components/basePopover/DefaultPopover.vue';
import BaseButton from '@fc/components/baseButton/BaseButton.vue';
import { ButtonColor, ButtonShape, ButtonVariant } from '@fc/components/baseButton/types';
import { Size } from '@fc/components/types/BaseElementsType';

const meta = {
  title: 'Features/Elements/Popover',
  component: DefaultPopover,
  tags: ['autodocs'],
  argTypes: {
    tag: { control: { type: 'text' } },
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
    teleportTo: { control: { type: 'text' } },
    zIndex: { control: { type: 'number' } },
    autoPlacement: { control: { type: 'boolean' } },
    closeOnClickOutside: { control: { type: 'boolean' } },
    closeOnEsc: { control: { type: 'boolean' } },
    interactive: { control: { type: 'boolean' } },
    open: {
      control: { type: 'boolean' },
      description: 'Controlled mode. Use together with trigger="manual".',
    },
    defaultOpen: { control: { type: 'boolean' } },
  },
  args: {
    tag: 'div',
    trigger: 'click',
    placement: 'bottom',
    align: 'center',
    offset: 8,
    openDelay: 0,
    closeDelay: 0,
    disabled: false,
    teleport: false,
    teleportTo: 'body',
    zIndex: 10000,
    autoPlacement: false,
    closeOnClickOutside: true,
    closeOnEsc: false,
    interactive: false,
    defaultOpen: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Headless primitive — управляет состоянием и позиционированием через slot scope (`isOpen`, `setOpen`, `toggle`, `floatingStyle`, `setRef`, `onMouseenter`, `onMouseleave`, `onClick`). Используется как основа для `BasePopover`, `BaseDropdown` и других.',
      },
    },
  },
} satisfies Meta<typeof DefaultPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

const contentStyle =
  'background:#fff;border-radius:8px;padding:12px 16px;box-shadow:0 8px 20px rgba(0,0,0,.12);min-width:160px;font-size:13px;';

export const Default: Story = {
  render: (args) => ({
    components: { DefaultPopover, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size, contentStyle };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <DefaultPopover v-bind="args">
          <template #trigger="{ onClick, setRef }">
            <div :ref="setRef">
              <BaseButton
                :variant="ButtonVariant.Contained"
                :color="ButtonColor.Primary"
                :size="Size.Medium"
                :shape="ButtonShape.Rectangle"
                @click="onClick"
              >
                Click me
              </BaseButton>
            </div>
          </template>
          <template #content="{ isOpen, setOpen, floatingStyle, setRef, onMouseenter, onMouseleave }">
            <div
              v-show="isOpen"
              :ref="setRef"
              :style="[floatingStyle, contentStyle]"
              @mouseenter="onMouseenter"
              @mouseleave="onMouseleave"
            >
              Popover content
              <div style="margin-top:8px;">
                <BaseButton
                  :variant="ButtonVariant.Outlined"
                  :color="ButtonColor.Tertiary"
                  :size="Size.Small"
                  :shape="ButtonShape.Rectangle"
                  @click="setOpen(false)"
                >
                  Close
                </BaseButton>
              </div>
            </div>
          </template>
        </DefaultPopover>
      </div>
    `,
  }),
};

export const HoverTrigger: Story = {
  args: {
    trigger: 'hover',
    placement: 'top',
    openDelay: 100,
    closeDelay: 150,
    interactive: true,
    teleport: true,
  },
  render: (args) => ({
    components: { DefaultPopover, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size, contentStyle };
    },
    template: `
      <div style="padding: 80px; display: inline-flex;">
        <DefaultPopover v-bind="args">
          <template #trigger="{ onMouseenter, onMouseleave, setRef }">
            <div :ref="setRef" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
              <BaseButton
                :variant="ButtonVariant.Outlined"
                :color="ButtonColor.Tertiary"
                :size="Size.Medium"
                :shape="ButtonShape.Rectangle"
              >
                Hover me
              </BaseButton>
            </div>
          </template>
          <template #content="{ isOpen, floatingStyle, setRef, onMouseenter, onMouseleave }">
            <div
              v-show="isOpen"
              :ref="setRef"
              :style="[floatingStyle, contentStyle]"
              @mouseenter="onMouseenter"
              @mouseleave="onMouseleave"
            >
              Hover content — move cursor here to keep open
            </div>
          </template>
        </DefaultPopover>
      </div>
    `,
  }),
};

export const ManualControlled: Story = {
  args: {
    trigger: 'manual',
    placement: 'right',
    teleport: true,
  },
  render: (args) => ({
    components: { DefaultPopover, BaseButton },
    setup() {
      const open = ref(false);
      return { args, open, ButtonVariant, ButtonColor, ButtonShape, Size, contentStyle };
    },
    template: `
      <div style="padding: 80px; display: flex; align-items: center; gap: 16px;">
        <BaseButton
          :variant="ButtonVariant.Contained"
          :color="ButtonColor.Primary"
          :size="Size.Medium"
          :shape="ButtonShape.Rectangle"
          @click="open = !open"
        >
          {{ open ? 'Close' : 'Open' }} popover
        </BaseButton>

        <DefaultPopover v-bind="args" v-model:open="open">
          <template #trigger="{ setRef }">
            <div :ref="setRef">
              <BaseButton
                :variant="ButtonVariant.Outlined"
                :color="ButtonColor.Secondary"
                :size="Size.Medium"
                :shape="ButtonShape.Rectangle"
              >
                Anchor
              </BaseButton>
            </div>
          </template>
          <template #content="{ isOpen, setOpen, floatingStyle, setRef }">
            <div v-show="isOpen" :ref="setRef" :style="[floatingStyle, contentStyle]">
              Controlled popover
            </div>
          </template>
        </DefaultPopover>
      </div>
    `,
  }),
};

export const AutoPlacement: Story = {
  args: {
    trigger: 'click',
    placement: 'top',
    autoPlacement: true,
    teleport: true,
  },
  render: (args) => ({
    components: { DefaultPopover, BaseButton },
    setup() {
      return { args, ButtonVariant, ButtonColor, ButtonShape, Size, contentStyle };
    },
    template: `
      <div style="padding: 16px 80px 200px; display: inline-flex;">
        <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Preferred: top. Near bottom of viewport — auto-flips to bottom.</p>
        <DefaultPopover v-bind="args">
          <template #trigger="{ onClick, setRef }">
            <div :ref="setRef">
              <BaseButton
                :variant="ButtonVariant.Outlined"
                :color="ButtonColor.Tertiary"
                :size="Size.Medium"
                :shape="ButtonShape.Rectangle"
                @click="onClick"
              >
                Auto placement
              </BaseButton>
            </div>
          </template>
          <template #content="{ isOpen, floatingStyle, setRef }">
            <div v-show="isOpen" :ref="setRef" :style="[floatingStyle, contentStyle]">
              Placed automatically based on available space
            </div>
          </template>
        </DefaultPopover>
      </div>
    `,
  }),
};

export const Placements: Story = {
  render: () => ({
    components: { DefaultPopover, BaseButton },
    setup() {
      return { ButtonVariant, ButtonColor, ButtonShape, Size, contentStyle };
    },
    template: `
      <div style="padding: 120px; display: grid; grid-template-columns: repeat(2, max-content); gap: 32px;">
        <DefaultPopover v-for="placement in ['top', 'bottom', 'left', 'right']" :key="placement" trigger="click" :placement="placement" teleport>
          <template #trigger="{ onClick, setRef }">
            <div :ref="setRef">
              <BaseButton
                :variant="ButtonVariant.Outlined"
                :color="ButtonColor.Tertiary"
                :size="Size.Medium"
                :shape="ButtonShape.Rectangle"
                @click="onClick"
              >
                {{ placement }}
              </BaseButton>
            </div>
          </template>
          <template #content="{ isOpen, floatingStyle, setRef }">
            <div v-show="isOpen" :ref="setRef" :style="[floatingStyle, contentStyle]">
              {{ placement }} content
            </div>
          </template>
        </DefaultPopover>
      </div>
    `,
  }),
};
