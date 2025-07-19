import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/button/BaseButton.vue';
import { ButtonType } from '@/components/button/ButtonTypes.ts';

describe('Test BaseButton', () => {
  it('Should correctly render slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
      props: {
        buttonType: ButtonType.Blue,
      },
    });

    expect(wrapper.text()).toContain('Click me');
  });

  it('Should apply correct classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        buttonType: ButtonType.Blue,
      },
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('base-button');
    expect(button.classes()).toContain('base-button--blue');
  });

  it('Should apply correct inline styles from props', () => {
    const wrapper = mount(BaseButton, {
      props: {
        buttonType: ButtonType.Red,
        height: 44,
        width: '200px',
      },
    });
    const button = wrapper.find('button');
    expect(button.attributes('style')).toContain('--height: 44px');
    expect(button.attributes('style')).toContain('--width: 200px');
  });

  it('Should apply auto values when if inline style props not provided', () => {
    const wrapper = mount(BaseButton, {
      props: {
        buttonType: ButtonType.Red,
      },
    });

    const button = wrapper.find('button');
    expect(button.attributes('style')).toContain('--height: auto');
    expect(button.attributes('style')).toContain('--width: auto');
  });
});
