import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';

import BasePagination from '@/components/basePagination/BasePagination.vue';

const meta = {
  title: 'UI/Pagination',
  component: BasePagination,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'number' },
    },
    pages: {
      control: { type: 'number' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    modelValue: 1,
    pages: 20,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=15614-14293&t=393yNUWCOzkMzoNZ-4)',
      },
    },
  },
} satisfies Meta<typeof BasePagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { BasePagination },
    setup() {
      const page = ref(args.modelValue);

      watch(
        () => args.modelValue,
        (v) => {
          page.value = v;
        }
      );

      return { args, page };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
        <BasePagination v-bind="args" v-model="page" />
        <div style="font-size: 14px;">Current page: {{ page }}</div>
      </div>
    `,
  }),
};

export const FewPages: Story = {
  args: {
    modelValue: 1,
    pages: 5,
  },
  render: (args) => ({
    components: { BasePagination },
    setup() {
      const page = ref(args.modelValue);
      return { args, page };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
        <BasePagination v-bind="args" v-model="page" />
        <div style="font-size: 14px;">Current page: {{ page }}</div>
      </div>
    `,
  }),
};

export const FirstPageMany: Story = {
  name: 'Many pages / first page',
  args: {
    modelValue: 1,
    pages: 20,
  },
};

export const MiddlePageMany: Story = {
  name: 'Many pages / middle page',
  args: {
    modelValue: 5,
    pages: 20,
  },
};

export const LastPageMany: Story = {
  name: 'Many pages / last page',
  args: {
    modelValue: 20,
    pages: 20,
  },
};
