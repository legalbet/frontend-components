import type { Meta, StoryObj } from '@storybook/vue3';

import BaseIndicator from '@fc/components/BaseIndicator.vue';

const meta = {
  title: 'UI/Indicator',
  component: BaseIndicator,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['daily', 'status', 'status-fill', 'square'],
    },
    color: {
      control: { type: 'select' },
      options: ['green', 'blue', 'red', 'yellow'],
    },
    bordered: { control: { type: 'boolean' } },
    position: {
      control: { type: 'select' },
      options: ['relative', 'absolute'],
    },
  },
  args: {
    type: 'status-fill',
    color: 'green',
    bordered: false,
    position: 'relative',
  },
} satisfies Meta<typeof BaseIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { BaseIndicator },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 24px; display: flex; align-items: center; gap: 12px;">
        <BaseIndicator v-bind="args" />
        <div style="font-family: Arial, sans-serif; font-size: 14px; opacity: 0.7;">
          type: {{ args.type }}, color: {{ args.color }}, position: {{ args.position }}
        </div>
      </div>
    `,
  }),
};

export const Types: Story = {
  render: () => ({
    components: { BaseIndicator },
    template: `
      <div style="padding: 24px; display: grid; grid-template-columns: repeat(2, max-content); gap: 16px; align-items: center;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <BaseIndicator type="status" color="green" />
          <span style="font-size: 14px; opacity: 0.7;">status</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <BaseIndicator type="status-fill" color="green" />
          <span style="font-size: 14px; opacity: 0.7;">status-fill</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <BaseIndicator type="daily" position="absolute" />
          <span style="font-size: 14px; opacity: 0.7;">daily (absolute)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <BaseIndicator type="square" color="green"><span style="font-size: 10px; font-weight: 800; color: white; line-height: 10px;">E</span></BaseIndicator>
          <span style="font-size: 14px; opacity: 0.7;">square (slot)</span>
        </div>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { BaseIndicator },
    template: `
      <div style="padding: 24px; display: flex; gap: 16px; align-items: center;">
        <BaseIndicator type="status-fill" color="green" />
        <BaseIndicator type="status-fill" color="blue" />
        <BaseIndicator type="status-fill" color="red" />
        <BaseIndicator type="status-fill" color="yellow" />
      </div>
    `,
  }),
};

export const Bordered: Story = {
  render: () => ({
    components: { BaseIndicator },
    template: `
      <div style="padding: 24px; display: flex; gap: 16px; align-items: center; background: #f0f1f2;">
        <BaseIndicator type="status-fill" color="green" :bordered="false" />
        <BaseIndicator type="status-fill" color="green" bordered />
        <BaseIndicator type="square" color="red" bordered><span style="font-size: 10px; font-weight: 800; color: white; line-height: 10px;">1</span></BaseIndicator>
      </div>
    `,
  }),
};

export const DailyPositioning: Story = {
  render: () => ({
    components: { BaseIndicator },
    template: `
      <div style="padding: 24px; display: grid; gap: 16px;">
        <div style="font-family: Arial, sans-serif; font-size: 14px; opacity: 0.7;">
          daily обычно имеет смысл в absolute-режиме (как бейдж), поэтому ниже обертка с position: relative.
        </div>
        <div style="position: relative; width: 220px; height: 56px; border: 1px dashed #d0d2d6; border-radius: 8px; display: flex; align-items: center; padding: 0 12px;">
          <div style="font-family: Arial, sans-serif; font-size: 14px;">Important item</div>
          <BaseIndicator type="daily" position="absolute" />
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <BaseIndicator type="daily" position="relative" />
          <div style="font-family: Arial, sans-serif; font-size: 14px; opacity: 0.7;">daily (relative)</div>
        </div>
      </div>
    `,
  }),
};
