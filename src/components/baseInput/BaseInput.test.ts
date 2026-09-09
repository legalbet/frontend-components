import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '@fc/components/baseInput/BaseInput.vue';
import { InputType, InputSizeType } from '@fc/components/baseInput/types';

describe('BaseInput', () => {
  it('renders input with label and placeholder', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        modelValue: '',
        label: 'Test Label',
        placeholder: 'Enter value',
      },
    });

    const input = wrapper.find('input');
    const labelText = wrapper.find('.input-box__label-text');
    const placeholder = wrapper.find('.input-box__placeholder');

    expect(input.attributes('id')).toBe('test-input');
    // placeholder у самого <input> теперь всегда " " (нужен для CSS :placeholder-shown)
    expect(input.attributes('placeholder')).toBe(' ');
    expect(labelText.text()).toBe('Test Label');
    expect(placeholder.exists()).toBe(true);
    expect(placeholder.text()).toBe('Enter value');
  });

  it('does not render placeholder element when placeholder is empty', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'no-placeholder',
        modelValue: '',
      },
    });

    expect(wrapper.find('.input-box__placeholder').exists()).toBe(false);
  });

  it('renders labelDescription when provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'with-desc',
        modelValue: '',
        label: 'Email',
        labelDescription: 'optional',
      },
    });

    const desc = wrapper.find('.input-box__label-description');
    expect(desc.exists()).toBe(true);
    expect(desc.text()).toBe('optional');
  });

  it('applies full-width modifier', () => {
    const wrapper = mount(BaseInput, {
      props: { id: 'fw', modelValue: '', fullWidth: true },
    });

    expect(wrapper.find('.input-box').classes()).toContain('input-box--full-width');
  });

  it('binds modelValue to input value', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'test-input',
        modelValue: 'Initial value',
      },
    });

    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).value).toBe('Initial value');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInput, {
      props: { id: 'input', modelValue: '' },
    });

    const input = wrapper.find('input');
    await input.setValue('new value');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
  });

  it('handles focus and blur events', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const wrapper = mount(BaseInput, {
      props: {
        id: 'input',
        modelValue: '',
        onFocus,
        onBlur,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  it('applies error styles when errors are provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'input',
        modelValue: '',
        errors: ['Field is required'],
      },
    });

    const inputBox = wrapper.find('.input-box');
    expect(inputBox.classes()).toContain('input-box--error');

    const errors = wrapper.findAll('.input-box__error');
    expect(errors).toHaveLength(1);
    expect(errors[0]?.text()).toBe('Field is required');
  });

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'input',
        modelValue: '',
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(true);
  });

  it('toggles password visibility when eye icon clicked', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'password-input',
        modelValue: '',
        type: InputType.Password,
      },
    });

    const inputBefore = wrapper.find('input');
    expect(inputBefore.attributes('type')).toBe('password');
    const baseIcon = wrapper.findComponent({ name: 'BaseIcon' });
    await baseIcon.trigger('click');
    await nextTick();

    const inputAfter = wrapper.find('input');
    expect(inputAfter.attributes('type')).toBe('text');
  });

  it('applies correct size classes', () => {
    const sizes = [InputSizeType.Base, InputSizeType.Small];

    sizes.forEach(size => {
      const wrapper = mount(BaseInput, {
        props: {
          id: `input-${size}`,
          modelValue: '',
          inputSizeType: size,
        },
      });

      const inputBox = wrapper.find('.input-box');
      expect(inputBox.classes()).toContain(`input-box--${size}`);
    });
  });

  it('renders without label when label is empty', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'no-label',
        modelValue: '',
        label: '',
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(false);
  });
});
