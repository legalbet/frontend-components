import type { Meta, StoryObj } from '@storybook/vue3';

import BaseLoader from '@fc/components/basePreloader/BaseLoader.vue';

const meta = {
  title: 'UI/Loader',
  component: BaseLoader,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'text' } },
    speed: { control: { type: 'text' } },
    color: { control: { type: 'color' } },
  },
  args: {
    size: '24px',
    speed: '2s',
    color: '#3591FD',
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=22541-6354&t=7RuqFQ4qvKozGwkc-4)',
      },
    },
  },
} satisfies Meta<typeof BaseLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderBaseLoader = (args: any) => ({
  components: { BaseLoader },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; align-items: center; justify-content: center; padding: 24px;">
      <BaseLoader :size="args.size" :speed="args.speed" :color="args.color" />
    </div>
  `,
});

export const Playground: Story = {
  render: renderBaseLoader,
};
