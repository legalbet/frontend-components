import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent } from 'vue';

import BaseMoreButton from '@/components/BaseMoreButton/BaseMoreButton.vue';

const NuxtLinkStub = defineComponent({
  name: 'NuxtLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    external: {
      type: Boolean,
      default: false,
    },
  },
  template: "<a :href=\"typeof to === 'string' ? to : '#'\"><slot /></a>",
});

const meta = {
  title: 'Features/Elements/BaseMoreButton',
  component: BaseMoreButton,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } },
  },
  args: {
    loading: false,
    title: 'Показать еще',
  },
  decorators: [
    () => ({
      template: '<div style="padding: 16px; background: #f6f6f6; max-width: 420px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof BaseMoreButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderStory = (args: unknown) => ({
  components: { BaseMoreButton },
  setup() {
    return { args: args as { loading?: boolean; title?: string } };
  },
  template: '<BaseMoreButton v-bind="args" />',
  global: {
    components: {
      NuxtLink: NuxtLinkStub,
    },
  },
});

export const Playground: Story = {
  render: renderStory,
};

export const Loading: Story = {
  args: {
    loading: true,
    title: 'Загрузка...',
  },
  render: renderStory,
};

export const CustomTitle: Story = {
  args: {
    title: 'Показать больше бонусов',
  },
  render: renderStory,
};
