import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCheckbox from '@/components/baseCheckbox/BaseCheckbox.vue';

describe('BaseCheckbox', () => {
  it('renders checkbox with labelHtml', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'test-checkbox',
        modelValue: false,
        labelHtml: 'Test Label',
      },
    });

    const input = wrapper.find('input[type="checkbox"]');
    const label = wrapper.find('label');

    expect(input.attributes('id')).toBe('test-checkbox');
    expect(label.attributes('for')).toBe('test-checkbox');

    expect(label.html()).toContain('Test Label');
  });

  it('renders label when #label slot is provided', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'slot-checkbox',
        modelValue: false,
        labelHtml: '',
      },
      slots: {
        label: '<span class="slot-label">Slot Label</span>',
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.find('.slot-label').exists()).toBe(true);
    expect(label.html()).toContain('Slot Label');
  });

  it('renders both slot content and labelHtml together', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'both-checkbox',
        modelValue: false,
        labelHtml: 'HTML Label',
      },
      slots: {
        label: '<span class="slot-label">Slot Label</span>',
      },
    });

    const label = wrapper.find('label');
    expect(label.html()).toContain('Slot Label');
    expect(label.html()).toContain('HTML Label');
  });

  it('binds modelValue to checked state', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'test-checkbox',
        modelValue: true,
        labelHtml: 'Test Label',
      },
    });

    const input = wrapper.find('input[type="checkbox"]');
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it('emits update:modelValue when changed', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'test-checkbox',
        modelValue: false,
        labelHtml: 'Test Label',
      },
    });

    const input = wrapper.find('input[type="checkbox"]');

    await input.setChecked(true);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('applies correct size classes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(BaseCheckbox, {
        props: {
          id: `checkbox-${size}`,
          modelValue: false,
          labelHtml: `${size} checkbox`,
          size,
        },
      });

      const input = wrapper.find('input');
      expect(input.classes()).toContain(`input-checkbox--${size}`);
    });
  });

  it('applies disabled state correctly', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'disabled-checkbox',
        modelValue: false,
        labelHtml: 'Disabled Checkbox',
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
    expect((input.element as HTMLInputElement).disabled).toBe(true);
  });

  it('does not emit update:modelValue when disabled', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'disabled-checkbox',
        modelValue: false,
        labelHtml: 'Disabled Checkbox',
        disabled: true,
      },
    });

    const input = wrapper.find('input[type="checkbox"]');

    await input.setChecked(true);

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('shows errors when provided', () => {
    const errors = ['Error message 1', 'Error message 2'];
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'error-checkbox',
        modelValue: false,
        labelHtml: 'Checkbox with errors',
        errors,
      },
    });

    const errorElements = wrapper.findAll('.text-error');
    expect(errorElements).toHaveLength(2);

    errors.forEach((error, index) => {
      expect(errorElements[index]?.text()).toBe(error);
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('input-checkbox--error');
  });

  it('renders HTML in labelHtml via v-html', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'html-checkbox',
        modelValue: false,
        labelHtml: 'I agree with <a href="/terms">terms</a>',
      },
    });

    const label = wrapper.find('label');
    expect(label.html()).toContain('<a href="/terms">terms</a>');
  });

  it('handles blur event', async () => {
    const onBlur = vi.fn();
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'test-checkbox',
        modelValue: false,
        labelHtml: 'Test Label',
        onBlur,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('blur');

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handles focus event', async () => {
    const onFocus = vi.fn();
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'test-checkbox',
        modelValue: false,
        labelHtml: 'Test Label',
        onFocus,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('focus');

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('applies custom checkbox classes', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'custom-class-checkbox',
        modelValue: false,
        labelHtml: 'Custom Class Checkbox',
        checkboxClass: 'custom-checkbox-class',
      },
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('custom-checkbox-class');
  });

  it('applies custom label classes', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'custom-label-checkbox',
        modelValue: false,
        labelHtml: 'Custom Label Checkbox',
        labelClass: 'custom-label-class',
      },
    });

    const label = wrapper.find('label');
    expect(label.classes()).toContain('custom-label-class');
  });

  it('renders without label when labelHtml is empty and slot is not provided', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'no-label-checkbox',
        modelValue: false,
        labelHtml: '',
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(false);
  });
});
