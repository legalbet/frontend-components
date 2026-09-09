import type { Meta, StoryObj } from '@storybook/vue3';

import BaseBadgeRating from '@/components/BaseBadge/BaseBadgeRating.vue';

const meta: Meta = {
  title: 'Features/Elements/BaseBadgeRating',
  component: BaseBadgeRating,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { BaseBadgeRating },
    template: `
      <div style="padding: 80px 32px; position: relative; border: 1px dashed rgba(0,0,0,0.15); width: 200px; height: 120px;">
        <span style="font-size: 12px; color: #888; position: absolute; top: 8px; left: 8px;">BaseBadgeRating</span>
        <BaseBadgeRating variant="paid" />
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { BaseBadgeRating },
    template: `
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 48px;">
        <div style="font-size: 13px; font-weight: 600; color: #444; border-bottom: 1px solid #eee; padding-bottom: 8px;">
          BaseBadgeRating — все варианты
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 80px;">
          <div v-for="variant in ['paid', 'paid-soft', 'free', 'free-soft']" :key="variant" style="position: relative; width: 120px; height: 80px; border: 1px dashed rgba(0,0,0,0.15); overflow: hidden;">
            <span style="position: absolute; bottom: 6px; left: 6px; font-size: 10px; color: #aaa; z-index: 10;">{{ variant }}</span>
            <BaseBadgeRating :variant="variant" />
          </div>
        </div>
      </div>
    `,
  }),
};
