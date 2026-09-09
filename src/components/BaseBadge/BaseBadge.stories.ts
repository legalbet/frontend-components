import type { Meta, StoryObj } from '@storybook/vue3';
import { computed } from 'vue';

import BaseBadge from '@fc/components/BaseBadge/BaseBadge.vue';
import { Color, ExtendedColor, Size, Variant } from '@fc/components/types/BaseElementsType';
import { IconNames } from '@fc/components/baseIcon/iconNames';

const ALL_COLORS = [...Object.values(Color), ...Object.values(ExtendedColor)];
const BADGE_SIZES = Object.values(Size).filter((s) => s !== Size.ExtraSmall);
const BADGE_VARIANTS = Object.values(Variant).filter((v) => v !== Variant.Ghost);

const meta: Meta = {
  title: 'UI/Badge',
  component: BaseBadge,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: BADGE_SIZES },
    color: { control: { type: 'select' }, options: ALL_COLORS },
    variant: { control: { type: 'select' }, options: BADGE_VARIANTS },
    rounded: { control: { type: 'boolean' } },
    iconName: {
      control: { type: 'select' },
      options: [null, ...Object.values(IconNames)],
    },
    icon: { table: { disable: true } },
  },
  args: {
    size: Size.Medium,
    color: Color.Primary,
    variant: Variant.Solid,
    rounded: false,
    iconName: null,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=21928-1666&t=7RuqFQ4qvKozGwkc-4)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseBadge },
    setup() {
      const icon = computed(() => (args.iconName ? { iconName: args.iconName } : null));
      return { args, icon };
    },
    template: `
      <div style="padding: 32px;">
        <BaseBadge
          :size="args.size"
          :color="args.color"
          :variant="args.variant"
          :rounded="args.rounded"
          :icon="icon"
        >Badge</BaseBadge>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { BaseBadge },
    setup() {
      const colors = [...Object.values(Color), ...Object.values(ExtendedColor)];
      const variants = BADGE_VARIANTS;
      return { colors, variants, Size };
    },
    template: `
      <div style="padding: 32px; display: grid; gap: 24px;">
        <div v-for="variant in variants" :key="variant" style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 12px; color: #888; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">{{ variant }}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <BaseBadge
              v-for="color in colors"
              :key="color"
              :color="color"
              :variant="variant"
              :size="Size.Medium"
            >
              {{ color }}
            </BaseBadge>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { BaseBadge },
    setup() {
      const sizes = BADGE_SIZES;
      return { sizes, Color, Variant };
    },
    template: `
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 16px;">
        <div v-for="size in sizes" :key="size" style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 12px; color: #888; width: 80px;">{{ size }}</span>
          <BaseBadge :size="size" :color="Color.Primary" :variant="Variant.Solid">Badge</BaseBadge>
          <BaseBadge :size="size" :color="Color.Primary" :variant="Variant.Soft">Badge</BaseBadge>
          <BaseBadge :size="size" :color="Color.Primary" :variant="Variant.Outlined">Badge</BaseBadge>
        </div>
      </div>
    `,
  }),
};

export const Rounded: Story = {
  render: () => ({
    components: { BaseBadge },
    setup() {
      const colors = [...Object.values(Color), ...Object.values(ExtendedColor)];
      return { colors, BADGE_VARIANTS, Size };
    },
    template: `
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 24px;">
        <div v-for="variant in BADGE_VARIANTS" :key="variant" style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 12px; color: #888; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">{{ variant }}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <BaseBadge
              v-for="color in colors"
              :key="color"
              :color="color"
              :variant="variant"
              :size="Size.Medium"
              :rounded="true"
            >
              {{ color }}
            </BaseBadge>
          </div>
        </div>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { BaseBadge },
    setup() {
      const colors = [...Object.values(Color), ...Object.values(ExtendedColor)];
      const icon = { iconName: IconNames.AiIcon };
      return { colors, BADGE_SIZES, BADGE_VARIANTS, icon, Color, Variant, Size };
    },
    template: `
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 12px; color: #888; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Sizes with icon</div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <div v-for="size in BADGE_SIZES" :key="size" style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <span style="font-size: 10px; color: #aaa;">{{ size }}</span>
              <BaseBadge :size="size" :color="Color.Primary" :variant="Variant.Solid" :icon="icon">Badge</BaseBadge>
            </div>
          </div>
        </div>
        <div v-for="variant in BADGE_VARIANTS" :key="variant" style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 12px; color: #888; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">{{ variant }}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <BaseBadge
              v-for="color in colors"
              :key="color"
              :color="color"
              :size="Size.Medium"
              :variant="variant"
              :icon="icon"
            >
              {{ color }}
            </BaseBadge>
          </div>
        </div>
      </div>
    `,
  }),
};
