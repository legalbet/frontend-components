import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BaseCheckbox from '@fc/components/baseCheckbox/BaseCheckbox.vue';
import BaseSwitcher from '@fc/components/baseSwitcher/BaseSwitcher.vue';
import BaseRadio from '@fc/components/baseRadio/BaseRadio.vue';

const meta = {
  title: 'UI/FormControls',
  component: BaseCheckbox,
  subcomponents: { BaseSwitcher, BaseRadio },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=22344-57257&m=dev)',
      },
    },
  },
} satisfies Meta<typeof BaseCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllControls: Story = {
  render: () => ({
    components: { BaseCheckbox, BaseSwitcher, BaseRadio },
    setup() {
      const checkbox = ref({
        unchecked: false,
        checked: true,
        disabled: false,
        disabledChecked: true,
        error: false,
      });
      const switcher = ref({
        small: false,
        medium: true,
        large: false,
        disabled: false,
        disabledChecked: true,
        error: false,
      });
      const radio = ref({
        unchecked: false,
        checked: true,
        disabled: false,
        disabledChecked: true,
        error: false,
      });
      return { checkbox, switcher, radio };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; padding: 32px; align-items: start;">

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h2 style="margin: 0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">Checkbox</h2>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="margin: 0; font-size: 12px; color: #aaa;">States</p>
            <BaseCheckbox id="cb-unchecked" v-model="checkbox.unchecked" label-html="Unchecked" />
            <BaseCheckbox id="cb-checked" v-model="checkbox.checked" label-html="Checked" />
            <BaseCheckbox id="cb-disabled" v-model="checkbox.disabled" label-html="Disabled" :disabled="true" />
            <BaseCheckbox id="cb-disabled-checked" v-model="checkbox.disabledChecked" label-html="Disabled checked" :disabled="true" />
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="margin: 0; font-size: 12px; color: #aaa;">Error</p>
            <BaseCheckbox id="cb-error" v-model="checkbox.error" label-html="With error" :errors="['Required field']" />
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h2 style="margin: 0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">Switcher</h2>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="margin: 0; font-size: 12px; color: #aaa;">States</p>
            <BaseSwitcher id="sw-off" v-model="switcher.unchecked" label="Off" />
            <BaseSwitcher id="sw-on" v-model="switcher.medium" label="On" />
            <BaseSwitcher id="sw-disabled" v-model="switcher.disabled" label="Disabled" :disabled="true" />
            <BaseSwitcher id="sw-disabled-on" v-model="switcher.disabledChecked" label="Disabled on" :disabled="true" />
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="margin: 0; font-size: 12px; color: #aaa;">Error</p>
            <BaseSwitcher id="sw-error" v-model="switcher.error" label="With error" :errors="['Required field']" />
          </div>

        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h2 style="margin: 0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">Radio</h2>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="margin: 0; font-size: 12px; color: #aaa;">States</p>
            <BaseRadio id="rb-unchecked" v-model="radio.unchecked" label-html="Unchecked" />
            <BaseRadio id="rb-checked" v-model="radio.checked" label-html="Checked" />
            <BaseRadio id="rb-disabled" v-model="radio.disabled" label-html="Disabled" :disabled="true" />
            <BaseRadio id="rb-disabled-checked" v-model="radio.disabledChecked" label-html="Disabled checked" :disabled="true" />
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <p style="margin: 0; font-size: 12px; color: #aaa;">Error</p>
            <BaseRadio id="rb-error" v-model="radio.error" label-html="With error" :errors="['Required field']" />
          </div>
        </div>

      </div>
    `,
  }),
};
