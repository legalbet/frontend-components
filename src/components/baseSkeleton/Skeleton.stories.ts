import type { Meta, StoryObj } from '@storybook/vue3';

import Skeleton from '@fc/components/baseSkeleton/BaseSkeleton.vue';

const VARIANTS = [
  '',
  'block',
  'block-xs',
  'block-md',
  'block-lg',
  'block-xl',
  'block-xxl',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'title',
  'text',
  'line',
  'circle',
  'circle-xs',
  'circle-md',
  'circle-lg',
  'circle-xl',
  'circle-xxl',
  'width-100',
  'width-50',
  'profile-circle',
];

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'text' },
    },
    radius: {
      control: { type: 'text' },
    },
    variant: {
      control: { type: 'select' },
      options: VARIANTS,
    },
  },
  args: {
    width: '160px',
    height: '16px',
    radius: '8px',
    variant: '',
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=22424-11774&t=393yNUWCOzkMzoNZ-4)',
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Skeleton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 24px; max-width: 600px;">
        <Skeleton v-bind="args" />
      </div>
    `,
  }),
};

export const Presets: Story = {
  render: () => ({
    components: { Skeleton },
    setup() {
      return { VARIANTS };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 12px; max-width: 600px;">
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="font-size: 14px; opacity: 0.7;">Text-like</div>
          <Skeleton variant="h1" />
          <Skeleton variant="h2" />
          <Skeleton variant="text" />
          <Skeleton variant="line" />
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="font-size: 14px; opacity: 0.7;">Blocks</div>
          <Skeleton variant="block" />
          <Skeleton variant="block-xs" />
          <Skeleton variant="block-md" />
          <Skeleton variant="block-lg" />
          <Skeleton variant="block-xl" />
          <Skeleton variant="block-xxl" />
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="font-size: 14px; opacity: 0.7;">Circles</div>
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <Skeleton variant="circle" />
            <Skeleton variant="circle-xs" />
            <Skeleton variant="circle-md" />
            <Skeleton variant="circle-lg" />
            <Skeleton variant="circle-xl" />
            <Skeleton variant="circle-xxl" />
            <Skeleton variant="profile-circle" />
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="font-size: 14px; opacity: 0.7;">Widths</div>
          <Skeleton variant="width-100" />
          <Skeleton variant="width-50" />
        </div>
      </div>
    `,
  }),
};
