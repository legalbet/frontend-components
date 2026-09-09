import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent } from 'vue';

import BaseBreadcrumbs from '@fc/components/baseBreadcrumbs/BaseBreadcrumbs.vue';

type Crumb = { name: string; link: string };
type BaseBreadcrumbsArgs = {
  crumbsData: {
    crumbs: Crumb[];
  };
};

const NuxtLinkStub = defineComponent({
  name: 'NuxtLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
  template: '<a :href="typeof to === \"string\" ? to : \"#\""><slot /></a>',
});

const ALL_CRUMBS: Crumb[] = [
  { name: 'Главная', link: '/' },
  { name: 'Второй уровень', link: '/level-2' },
  { name: 'Третий уровень', link: '/level-2/level-3' },
  { name: 'Текущая страница', link: '/level-2/level-3/page' },
];

const meta = {
  title: 'UI/Breadcrumbs',
  component: BaseBreadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    crumbsData: { control: { type: 'object' } },
  },
  args: {
    crumbsData: { crumbs: ALL_CRUMBS },
  },
  decorators: [
    () => ({
      template: '<div style="padding: 16px; background: var(--bg-page, #fff); max-width: 600px;"><story /></div>',
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=21223-9160&t=eTIKhRXdouX1UgCM-4)',
      },
    },
  },
} satisfies Meta<typeof BaseBreadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { BaseBreadcrumbs },
    setup() {
      return { args: args as BaseBreadcrumbsArgs };
    },
    template: '<BaseBreadcrumbs :crumbs-data="args.crumbsData" />',
    global: { components: { NuxtLink: NuxtLinkStub } },
  }),
};
