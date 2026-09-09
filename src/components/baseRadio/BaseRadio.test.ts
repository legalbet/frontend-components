import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseRadio from '@fc/components/baseRadio/BaseRadio.vue';
import { Size } from '@fc/components/types/BaseElementsType';


describe('BaseRadio', () => {
  it('renders radio button with label', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'test-radio',
        modelValue: false,
        labelHtml: 'Test Label',
      },
    });

    const input = wrapper.find('input[type="radio"]');
    const label = wrapper.find('label');

    expect(input.attributes('id')).toBe('test-radio');
    expect(label.attributes('for')).toBe('test-radio');
    expect(label.html()).toContain('Test Label');
  });

  it('binds modelValue to checked state', async () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'test-radio',
        modelValue: true,
        labelHtml: 'Test Label',
      },
    });

    const input = wrapper.find('input[type="radio"]');
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it('emits update:modelValue when changed', async () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'test-radio',
        modelValue: false,
        labelHtml: 'Test Label',
      },
    });

    const input = wrapper.find('input[type="radio"]');
    await input.setValue(true);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('applies correct size classes', () => {
    const sizes = [Size.Large, Size.Medium, Size.Small] as const;

    sizes.forEach(size => {
      const wrapper = mount(BaseRadio, {
        props: {
          id: `radio-${size}`,
          modelValue: false,
          labelHtml: `${size} radio`,
          size,
        },
      });

      const input = wrapper.find('input');
      expect(input.classes()).toContain(`input-radio--${size}`);
    });
  });

  it('applies disabled state correctly', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'disabled-radio',
        modelValue: false,
        labelHtml: 'Disabled Radio',
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
    expect((input.element as HTMLInputElement).disabled).toBe(true);
  });

  it('does not emit events when disabled', async () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'disabled-radio',
        modelValue: false,
        labelHtml: 'Disabled Radio',
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    await input.setValue(true);

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('shows errors when provided', () => {
    const errors = ['Error message 1', 'Error message 2'];
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'error-radio',
        modelValue: false,
        labelHtml: 'Radio with errors',
        errors,
      },
    });

    const errorElements = wrapper.findAll('.text-error');
    expect(errorElements).toHaveLength(2);

    errors.forEach((error, index) => {
      expect(errorElements[index]?.text()).toBe(error);
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('input-radio--error');
  });

  it('renders HTML in label', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'html-radio',
        modelValue: false,
        labelHtml: 'I accept <a href="/terms">terms</a>',
      },
    });

    const label = wrapper.find('label');
    expect(label.html()).toContain('<a href="/terms">terms</a>');
  });

  it('handles blur event', async () => {
    const onBlur = vi.fn();
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'test-radio',
        modelValue: false,
        labelHtml: 'Test Label',
        onBlur,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('blur');

    expect(onBlur).toHaveBeenCalled();
  });

  it('handles focus event', async () => {
    const onFocus = vi.fn();
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'test-radio',
        modelValue: false,
        labelHtml: 'Test Label',
        onFocus,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('focus');

    expect(onFocus).toHaveBeenCalled();
  });

  it('applies custom radio classes', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'custom-class-radio',
        modelValue: false,
        labelHtml: 'Custom Class Radio',
        radioClass: 'custom-radio-class',
      },
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('custom-radio-class');
  });

  it('applies custom label classes', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'custom-label-radio',
        modelValue: false,
        labelHtml: 'Custom Label Radio',
        labelClass: 'custom-label-class',
      },
    });

    const label = wrapper.find('label');
    expect(label.classes()).toContain('custom-label-class');
  });

  it('renders without label when labelHtml is empty', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'no-label-radio',
        modelValue: false,
        labelHtml: '',
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(false);
  });

  it('toggles checked state when clicked', async () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'toggle-radio',
        modelValue: false,
        labelHtml: 'Toggle Radio',
      },
    });

    const input = wrapper.find('input[type="radio"]');

    expect((input.element as HTMLInputElement).checked).toBe(false);

    await input.setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

    await wrapper.setProps({ modelValue: true });
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it('has radio input type', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        id: 'test-radio',
        modelValue: false,
        labelHtml: 'Test Radio',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('radio');
  });
});
