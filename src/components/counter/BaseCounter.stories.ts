import type { Meta, StoryObj } from '@storybook/vue3';

import BaseCounter from '@/components/counter/BaseCounter.vue';
import { Size, Color } from '@/components/types/BaseElementsType';

const meta = {
  title: 'UI/Counter',
  component: BaseCounter,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: Object.values(Size) },
    color: { control: { type: 'select' }, options: Object.values(Color) },
  },
  args: {
    size: Size.Medium,
    color: Color.Primary,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=15615-23906&t=tYrngOASHX4QUe7i-4)',
      },
    },
  },
} satisfies Meta<typeof BaseCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { BaseCounter },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 24px;">
        <BaseCounter v-bind="args">42</BaseCounter>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { BaseCounter },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; padding: 24px;">
        <BaseCounter size="${Size.Small}" color="${Color.Primary}">7</BaseCounter>
        <BaseCounter size="${Size.Medium}" color="${Color.Primary}">42</BaseCounter>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { BaseCounter },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; padding: 24px;">
        <BaseCounter size="${Size.Medium}" color="${Color.Primary}">Primary</BaseCounter>
        <BaseCounter size="${Size.Medium}" color="${Color.Secondary}">Secondary</BaseCounter>
        <BaseCounter size="${Size.Medium}" color="${Color.Neutral}">Neutral</BaseCounter>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { BaseCounter },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 12px; width: 80px; color: #888;">Small</span>
          <BaseCounter size="${Size.Small}" color="${Color.Primary}">1</BaseCounter>
          <BaseCounter size="${Size.Small}" color="${Color.Secondary}">1</BaseCounter>
          <BaseCounter size="${Size.Small}" color="${Color.Neutral}">1</BaseCounter>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 12px; width: 80px; color: #888;">Medium</span>
          <BaseCounter size="${Size.Medium}" color="${Color.Primary}">42</BaseCounter>
          <BaseCounter size="${Size.Medium}" color="${Color.Secondary}">42</BaseCounter>
          <BaseCounter size="${Size.Medium}" color="${Color.Neutral}">42</BaseCounter>
        </div>
      </div>
    `,
  }),
};
