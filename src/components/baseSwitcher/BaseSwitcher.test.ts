import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSwitcher from '@fc/components/baseSwitcher/BaseSwitcher.vue';
import { Size } from '@fc/components/types/BaseElementsType';

describe('BaseSwitcher', () => {
  it('renders with label and id', () => {
    const wrapper = mount(BaseSwitcher, {
      props: {
        id: 'switcher-id',
        modelValue: false,
        label: 'Test Switcher',
      },
    });

    const label = wrapper.find('label');
    const input = wrapper.find('input[type="checkbox"]');

    expect(label.exists()).toBe(true);
    expect(input.exists()).toBe(true);
    expect(label.text()).toContain('Test Switcher');
    expect(input.attributes('id')).toBe('switcher-id');
  });

  it('binds modelValue to checked state', () => {
    const wrapper = mount(BaseSwitcher, {
      props: {
        id: 'switcher',
        modelValue: true,
      },
    });

    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it('emits update:modelValue when toggled', async () => {
    const wrapper = mount(BaseSwitcher, {
      props: {
        id: 'switcher',
        modelValue: false,
      },
    });

    const input = wrapper.find('input');
    await input.setValue(true);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('applies correct size class', () => {
    const sizes = [Size.Small, Size.Medium, Size.Large];
    sizes.forEach(size => {
      const wrapper = mount(BaseSwitcher, {
        props: {
          id: `switcher-${size}`,
          modelValue: false,
          size,
        },
      });
      const label = wrapper.find('label');
      expect(label.classes()).toContain(size);
    });
  });

  it('applies disabled state correctly', () => {
    const wrapper = mount(BaseSwitcher, {
      props: {
        id: 'disabled-switcher',
        modelValue: false,
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(true);
  });

  it('does not emit update when disabled', async () => {
    const wrapper = mount(BaseSwitcher, {
      props: {
        id: 'disabled-switcher',
        modelValue: false,
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    await input.setValue(true);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('renders without label text when label is empty', () => {
    const wrapper = mount(BaseSwitcher, {
      props: {
        id: 'no-label-switcher',
        modelValue: false,
        label: '',
      },
    });

    const labelText = wrapper.find('.switcher-label');
    expect(labelText.text()).toBe('');
  });

  it('updates checked state correctly after toggle', async () => {
    const wrapper = mount(BaseSwitcher, {
      props: {
        id: 'switcher',
        modelValue: false,
      },
    });

    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).checked).toBe(false);

    await input.setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });
});
