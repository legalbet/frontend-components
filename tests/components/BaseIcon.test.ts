import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import IconComponent from '@/components/icon/BaseIcon.vue';
import { IconNames } from '@/components/icon/iconNames.ts';

describe('IconComponent', () => {
  it('renders with default props', () => {
    const wrapper = mount(IconComponent, {
      props: {
        iconName: IconNames.Star,
        textColor: 'white',
      },
    });

    const icon = wrapper.find('i');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('icon');
    expect(icon.classes()).toContain('icon-star');
    expect(icon.attributes('style')).toContain('--text-color: white');
    expect(icon.attributes('style')).toContain('--size: auto');
    expect(icon.attributes('style')).toContain('--font-size: 0.875rem');
  });

  it('applies custom styles based on props', () => {
    const wrapper = mount(IconComponent, {
      props: {
        iconName: IconNames.Star,
        textColor: 'blue',
        size: '24px',
        fontSize: '1rem',
        tagName: 'span',
      },
    });

    const icon = wrapper.find('span');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('icon');
    expect(icon.classes()).toContain('icon-star');
    expect(icon.attributes('style')).toContain('--text-color: blue');
    expect(icon.attributes('style')).toContain('--size: 24px');
    expect(icon.attributes('style')).toContain('--font-size: 1rem');
  });

  it('changes tag name based on prop', () => {
    const wrapper = mount(IconComponent, {
      props: {
        iconName: IconNames.Star,
        textColor: 'red',
        tagName: 'div',
      },
    });

    const icon = wrapper.find('div');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('icon');
    expect(icon.classes()).toContain('icon-star');
  });
});
