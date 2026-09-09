import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent } from 'vue';

import BaseLink from '@/components/BaseLink.vue';
import { LinkColor, Size } from '@/components/types/BaseElementsType';

type BaseLinkArgs = {
  color?: LinkColor;
  size?: Size;
  endIcon?: string;
  startIcon?: string;
  disabled?: boolean;
  customStyles?: Record<string, string> | null;
  urlParams: { url: string; external: boolean };
  rel?: string;
  target?: string;
  isUnderline?: boolean;
  title?: string;
  centered?: boolean;
  label?: string;
};

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
    rel: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  template: `
    <a
      :href="typeof to === 'string' ? to : '#'"
      :rel="rel || undefined"
      :target="target || undefined"
      :title="title || undefined"
    >
      <slot />
    </a>
  `,
});

const STUB = { NuxtLink: NuxtLinkStub };

const URL_PARAMS = { url: 'https://legalbet.ru', external: true };

const meta = {
  title: 'UI/Link',
  component: BaseLink,
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
    color: {
      control: { type: 'select' },
      options: Object.values(LinkColor),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
    },
    centered: { control: { type: 'boolean' } },
    isUnderline: { control: { type: 'boolean' } },
    startIcon: { control: { type: 'text' } },
    endIcon: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } },
    rel: { control: { type: 'text' } },
    target: { control: { type: 'text' } },
    customStyles: { control: { type: 'object' } },
    urlParams: { control: { type: 'object' } },
  },
  args: {
    label: 'Перейти',
    color: LinkColor.Accent,
    size: Size.Medium,
    centered: false,
    isUnderline: false,
    startIcon: '',
    endIcon: '',
    disabled: false,
    title: 'Ссылка',
    rel: '',
    target: '',
    customStyles: null,
    urlParams: URL_PARAMS,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=22297-18679&t=eTIKhRXdouX1UgCM-4)',
      },
    },
  },
  decorators: [
    () => ({
      template: '<div style="padding: 16px; background: var(--bg-page, #fff); max-width: 480px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof BaseLink>;

export default meta;

type Story = StoryObj<typeof meta>;
type Args = BaseLinkArgs & Record<string, unknown>;

const renderStory = (args: unknown) => ({
  components: { BaseLink },
  setup() {
    return { args: args as Args };
  },
  template: `
    <BaseLink
      :color="args.color"
      :size="args.size"
      :start-icon="args.startIcon"
      :end-icon="args.endIcon"
      :disabled="args.disabled"
      :custom-styles="args.customStyles"
      :url-params="args.urlParams"
      :rel="args.rel"
      :target="args.target"
      :is-underline="args.isUnderline"
      :title="args.title"
      :centered="args.centered"
    >
      {{ args.label }}
    </BaseLink>
  `,
  global: { components: STUB },
});

export const Playground: Story = {
  render: renderStory,
};

// ─── States ──────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States / All colors + disabled',
  render: () => ({
    components: { BaseLink },
    setup() {
      const colors = Object.values(LinkColor);
      return { colors, URL_PARAMS };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div
          v-for="color in colors"
          :key="color"
          :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: color === 'invert' ? 'var(--bg-surface-accent, #1a1a2e)' : 'transparent',
          }"
        >
          <span style="min-width: 60px; font-size: 12px; opacity: 0.6;">{{ color }}</span>
          <BaseLink :color="color" :url-params="URL_PARAMS">Активная</BaseLink>
          <BaseLink :color="color" :url-params="URL_PARAMS" :disabled="true">Disabled</BaseLink>
        </div>
      </div>
    `,
    global: { components: STUB },
  }),
};

// ─── Icon ─────────────────────────────────────────────────────────────────────

export const Icon: Story = {
  name: 'Icon / No icon · Start · End',
  render: () => ({
    components: { BaseLink },
    setup() {
      return { URL_PARAMS };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 100px; font-size: 12px; opacity: 0.6;">Без иконки</span>
          <BaseLink :url-params="URL_PARAMS">Перейти</BaseLink>
        </div>
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 100px; font-size: 12px; opacity: 0.6;">Иконка слева</span>
          <BaseLink :url-params="URL_PARAMS" start-icon="arrow-left">Перейти</BaseLink>
        </div>
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 100px; font-size: 12px; opacity: 0.6;">Иконка справа</span>
          <BaseLink :url-params="URL_PARAMS" end-icon="arrow-right">Перейти</BaseLink>
        </div>
      </div>
    `,
    global: { components: STUB },
  }),
};

// ─── Size ─────────────────────────────────────────────────────────────────────

export const SizeStory: Story = {
  name: 'Size / All sizes with end icon',
  render: () => ({
    components: { BaseLink },
    setup() {
      const sizes = Object.values(Size);
      return { sizes, URL_PARAMS };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div v-for="size in sizes" :key="size" style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 80px; font-size: 12px; opacity: 0.6;">{{ size }}</span>
          <BaseLink :size="size" :url-params="URL_PARAMS" end-icon="arrow-right">Перейти</BaseLink>
        </div>
      </div>
    `,
    global: { components: STUB },
  }),
};

// ─── TextStyle ────────────────────────────────────────────────────────────────

export const TextStyle: Story = {
  name: 'TextStyle / Normal · Underline',
  render: () => ({
    components: { BaseLink },
    setup() {
      return { URL_PARAMS };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 100px; font-size: 12px; opacity: 0.6;">Обычный</span>
          <BaseLink :url-params="URL_PARAMS">Читать далее</BaseLink>
        </div>
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 100px; font-size: 12px; opacity: 0.6;">Подчёркнутый</span>
          <BaseLink :url-params="URL_PARAMS" :is-underline="true">Читать далее</BaseLink>
        </div>
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 100px; font-size: 12px; opacity: 0.6;">С иконкой</span>
          <BaseLink :url-params="URL_PARAMS" :is-underline="true" end-icon="arrow-right">Читать далее</BaseLink>
        </div>
      </div>
    `,
    global: { components: STUB },
  }),
};
