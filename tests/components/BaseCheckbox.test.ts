import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import BaseCheckbox from '@/components/checkbox/BaseCheckbox.vue';

describe('BaseCheckbox', () => {
  it('renders correctly with label', () => {
    const modelValue = ref(false);
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'checkbox1',
        labelHtml: 'Test Label',
        modelValue: modelValue.value,
        'onUpdate:modelValue': (value) => (modelValue.value = value),
      },
    });

    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toContain('Test Label');
  });

  it('applies correct classes based on props', () => {
    const modelValue = ref(false);
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'checkbox1',
        checkboxClass: 'custom-checkbox',
        errors: ['Error 1'],
        modelValue: modelValue.value,
        'onUpdate:modelValue': (value) => (modelValue.value = value),
      },
    });

    const checkbox = wrapper.find('input');
    expect(checkbox.classes()).toContain('custom-checkbox');
    expect(checkbox.classes()).toContain('input-checkbox--error');
  });

  it('toggles model value on change', async () => {
    const modelValue = ref(false);
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'checkbox1',
        modelValue: modelValue.value,
        'onUpdate:modelValue': (value) => (modelValue.value = value),
      },
    });

    const checkbox = wrapper.find('input');
    await checkbox.setValue(true);
    expect(modelValue.value).toBe(true);

    await checkbox.setValue(false);
    expect(modelValue.value).toBe(false);
  });

  it('calls onBlur and onFocus handlers', async () => {
    const modelValue = ref(false);
    const onBlur = vi.fn();
    const onFocus = vi.fn();

    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'checkbox1',
        onBlur,
        onFocus,
        modelValue: modelValue.value,
        'onUpdate:modelValue': (value) => (modelValue.value = value),
      },
    });

    const checkbox = wrapper.find('input');
    await checkbox.trigger('focus');
    expect(onFocus).toHaveBeenCalled();

    await checkbox.trigger('blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('displays errors when present', () => {
    const modelValue = ref(false);
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'checkbox1',
        errors: ['Error 1', 'Error 2'],
        modelValue: modelValue.value,
        'onUpdate:modelValue': (value) => (modelValue.value = value),
      },
    });

    const errorMessages = wrapper.findAll('.text-error');
    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].text()).toBe('Error 1');
    expect(errorMessages[1].text()).toBe('Error 2');
  });
  it('calls handleChange on input change', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        id: 'checkbox1',
        modelValue: false,
      },
    });

    const checkbox = wrapper.find('input');
    await checkbox.setValue(true); // Устанавливаем значение true, чтобы вызвать событие @change
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0])?.toEqual([true]);
  });
});
