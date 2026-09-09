import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';

import BaseOverlay from '@fc/components/baseOverlay/BaseOverlay.vue';

const meta: Meta = {
  title: 'UI/Overlay',
  component: BaseOverlay,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    lockScroll: {
      control: { type: 'boolean' },
    },
    white: {
      control: { type: 'boolean' },
    },
  },
  args: {
    open: false,
    lockScroll: false,
    white: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const renderOverlay = (args: any) => ({
  components: { BaseOverlay },
  setup() {
    const open = ref(Boolean(args.open));

    watch(
      () => args.open,
      (value) => {
        open.value = Boolean(value);
      }
    );

    return { args, open };
  },
  template: `
    <div style="height: 180vh; padding: 24px; background: linear-gradient(180deg, #f5f7fb 0%, #ffffff 60%);">
      <div style="max-width: 680px;">
        <h3 style="margin: 0 0 8px; font: 600 18px/1.2 system-ui;">Page content behind overlay</h3>
        <p style="margin: 0 0 16px; font: 400 14px/1.5 system-ui; color: rgba(0,0,0,.65);">
          Use <code>open</code> control to mount/unmount overlay. When it is mounted, it locks body scroll by design.
        </p>
        <button
          type="button"
          @click="open = !open"
          style="padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(0,0,0,.12); background: #fff; cursor: pointer;"
        >
          {{ open ? 'Close overlay' : 'Open overlay' }}
        </button>
      </div>

      <BaseOverlay v-if="open" :white="args.white" :lock-scroll="args.lockScroll">
        <div style="width: 420px; padding: 16px; border-radius: 12px; background: #fff; box-shadow: 0 10px 40px rgba(0,0,0,.18);">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="font: 600 16px/1.2 system-ui;">Overlay content</div>
            <div style="font: 400 12px/1.2 system-ui; color: rgba(0,0,0,.55);">(slot)</div>
          </div>
          <div style="margin-top: 10px; font: 400 14px/1.5 system-ui; color: rgba(0,0,0,.7);">
            This block is rendered inside <code>BaseOverlay</code>.
          </div>
        </div>
      </BaseOverlay>
    </div>
  `,
});

export const Playground: Story = {
  render: renderOverlay,
};

export const Dark: Story = {
  args: {
    open: true,
    white: false,
  },
  render: renderOverlay,
};

export const White: Story = {
  args: {
    open: true,
    white: true,
  },
  render: renderOverlay,
};
