import type { Meta, StoryObj } from '@storybook/vue3';
import { computed } from 'vue';

import BaseButton from '@fc/components/baseButton/BaseButton.vue';
import { ButtonColor, ButtonShape, ButtonTag, ButtonVariant } from '@fc/components/baseButton/types';
import { Size } from '@fc/components/types/BaseElementsType';
import { IconNames } from '@fc/components/baseIcon/iconNames';

type ExtraArgs = {
  label?: string;
  startIconName?: IconNames | null;
  endIconName?: IconNames | null;
  loadingEnabled?: boolean;
  loadingPosition?: 'start' | 'end' | 'center';
  loadingHideText?: boolean;
};

const meta: Meta = {
  title: 'UI/Button',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: { type: 'select' },
      options: Object.values(ButtonTag),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(ButtonVariant),
    },
    color: {
      control: { type: 'select' },
      options: Object.values(ButtonColor),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
    },
    shape: {
      control: { type: 'select' },
      options: Object.values(ButtonShape),
    },
    disabled: { control: { type: 'boolean' } },
    href: { control: { type: 'text' } },
    customStyles: { control: { type: 'object' } },

    loadingEnabled: { control: { type: 'boolean' } },
    loadingPosition: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
    loadingHideText: { control: { type: 'boolean' } },

    // Derived controls (mapped to *IconParams)
    startIconName: {
      control: { type: 'select' },
      options: [null, ...Object.values(IconNames)],
    },
    endIconName: {
      control: { type: 'select' },
      options: [null, ...Object.values(IconNames)],
    },

    // Hide complex props from controls (we build them from icon names)
    startIconParams: { table: { disable: true } },
    endIconParams: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  args: {
    label: 'Button',
    tag: ButtonTag.Button,
    variant: ButtonVariant.Solid,
    color: ButtonColor.Primary,
    size: Size.Medium,
    shape: ButtonShape.Rectangle,
    disabled: false,
    href: 'https://legalbet.ru',
    customStyles: null,
    startIconName: null,
    endIconName: null,
    loadingEnabled: false,
    loadingPosition: 'center',
    loadingHideText: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=22330-21519&t=eTIKhRXdouX1UgCM-4)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

type Args = ExtraArgs & Record<string, unknown>;

const renderButton = (args: Args) => ({
  components: { BaseButton },
  setup() {
    const startIconParams = args.startIconName ? { iconName: args.startIconName } : null;
    const endIconParams = args.endIconName ? { iconName: args.endIconName } : null;

    const loading = computed(() => {
      if (!args.loadingEnabled) return false;
      if (args.loadingPosition === 'center') return true;
      return { position: args.loadingPosition, hideText: args.loadingHideText };
    });

    return { args, startIconParams, endIconParams, loading };
  },
  template: `
    <BaseButton
      :tag="args.tag"
      :variant="args.variant"
      :color="args.color"
      :size="args.size"
      :shape="args.shape"
      :disabled="args.disabled"
      :href="args.href"
      :custom-styles="args.customStyles"
      :start-icon-params="startIconParams"
      :end-icon-params="endIconParams"
      :loading="loading"
    >
      {{ args.label }}
    </BaseButton>
  `,
});

// ─── Loading ─────────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: 'Loading / Center · Start · End',
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 60px; font-size: 12px; opacity: 0.6;">center</span>
          <BaseButton :loading="true">Button</BaseButton>
        </div>
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 60px; font-size: 12px; opacity: 0.6;">start</span>
          <BaseButton :loading="{ position: 'start' }">Button</BaseButton>
        </div>
        <div style="display: flex; align-items: center; gap: 32px;">
          <span style="min-width: 60px; font-size: 12px; opacity: 0.6;">end</span>
          <BaseButton :loading="{ position: 'end' }">Button</BaseButton>
        </div>
      </div>
    `,
  }),
};

// ─── Icons ───────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'Icons / Only · Before · After',
  render: () => ({
    components: { BaseButton },
    setup() {
      const sizes = Object.values(Size);
      const icon = { iconName: IconNames.Home };
      return { sizes, icon };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="font-size: 12px; opacity: 0.6;">Только иконка</div>
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <div v-for="size in sizes" :key="'only-' + size" style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <span style="font-size: 10px; opacity: 0.5;">{{ size }}</span>
              <BaseButton :size="size" :start-icon-params="icon" />
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="font-size: 12px; opacity: 0.6;">Иконка слева</div>
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <div v-for="size in sizes" :key="'start-' + size" style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <span style="font-size: 10px; opacity: 0.5;">{{ size }}</span>
              <BaseButton :size="size" :start-icon-params="icon">Кнопка</BaseButton>
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="font-size: 12px; opacity: 0.6;">Иконка справа</div>
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <div v-for="size in sizes" :key="'end-' + size" style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <span style="font-size: 10px; opacity: 0.5;">{{ size }}</span>
              <BaseButton :size="size" :end-icon-params="icon">Кнопка</BaseButton>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { BaseButton },
    setup() {
      const variants = Object.values(ButtonVariant);
      const colors = Object.values(ButtonColor);

      return { variants, colors };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div v-for="variant in variants" :key="variant" style="display: flex; flex-direction: column; gap: 10px;">
          <div style="font-size: 14px; opacity: 0.7;">{{ variant }}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
            <BaseButton
              v-for="color in colors"
              :key="color"
              :variant="variant"
              :color="color"
            >
              {{ color }}
            </BaseButton>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
            <BaseButton
              v-for="color in colors"
              :key="'loading-' + color"
              :variant="variant"
              :color="color"
              :loading="true"
            >
              {{ color }}
            </BaseButton>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { BaseButton },
    setup() {
      const sizes = Object.values(Size);
      return { sizes };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <BaseButton v-for="size in sizes" :key="size" :size="size">
            {{ size }}
          </BaseButton>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <BaseButton v-for="size in sizes" :key="size + '-rounded'" :size="size" shape="rounded">
            {{ size }} rounded
          </BaseButton>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
  render: renderButton,
};
