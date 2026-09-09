import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTextarea from '@/components/baseTextarea/BaseTextarea.vue';

describe('BaseTextarea', () => {
  it('renders textarea and label', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        id: 'textarea-id',
        label: 'Test Label',
        modelValue: '',
      },
    });

    const textarea = wrapper.find('textarea');
    const label = wrapper.find('label');

    expect(textarea.exists()).toBe(true);
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Test Label');
    expect(textarea.attributes('id')).toBe('textarea-id');
  });

  it('binds modelValue correctly', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: 'initial text',
      },
    });

    const textarea = wrapper.find('textarea');
    expect((textarea.element as HTMLTextAreaElement).value).toBe('initial text');
  });

  it('emits update:modelValue when typing', async () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
      },
    });

    const textarea = wrapper.find('textarea');
    await textarea.setValue('Hello world');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hello world']);
  });

  it('applies custom height correctly', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        height: 150,
      },
    });

    const textarea = wrapper.find('textarea');
    const style = textarea.attributes('style') || '';
    expect(style.includes('150px')).toBe(true);
  });

  it('renders placeholder text', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        placeholder: 'Enter text...',
      },
    });

    const textarea = wrapper.find('textarea');
    // placeholder у textarea всегда " " — нужен для CSS :placeholder-shown
    expect(textarea.attributes('placeholder')).toBe(' ');

    const placeholderEl = wrapper.find('.input-box__placeholder');
    expect(placeholderEl.exists()).toBe(true);
    expect(placeholderEl.text()).toBe('Enter text...');
  });

  it('renders errors when passed', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        errors: ['Field required', 'Too short'],
      },
    });

    const errors = wrapper.findAll('.input-box__error');
    expect(errors.length).toBe(2);
    expect(errors[0]?.text()).toBe('Field required');
    expect(errors[1]?.text()).toBe('Too short');
  });

  it('adds error class when errors exist', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        errors: ['Invalid input'],
      },
    });

    const container = wrapper.find('.input-box__container');
    expect(container.classes()).toContain('input-box__container--error');
  });

  it('renders correctly without label', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        label: '',
      },
    });

    // при пустом label элемент .input-box__label не рендерится (v-if)
    expect(wrapper.find('.input-box__label').exists()).toBe(false);
  });

  it('calls onBlur and onFocus when provided', async () => {
    const onBlur = vi.fn();
    const onFocus = vi.fn();

    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        onBlur,
        onFocus,
      },
    });

    const textarea = wrapper.find('textarea');
    await textarea.trigger('focus');
    await textarea.trigger('blur');

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
