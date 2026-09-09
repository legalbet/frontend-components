import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import { IconNames } from '@fc/components/baseIcon/iconNames';

describe('BaseIcon', () => {
  it('renders icon with default props', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        iconName: IconNames.Star,
      },
    });

    expect(wrapper.find('i').exists()).toBe(true);
    expect(wrapper.classes()).toContain('icon');
    expect(wrapper.classes()).toContain('icon-star');
  });

  it('renders with correct icon name class', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        iconName: IconNames.CircleCheck,
      },
    });

    expect(wrapper.classes()).toContain('icon-circle-check');
  });

  it('renders with custom tag name', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        iconName: IconNames.Plus,
        tagName: 'span',
      },
    });

    expect(wrapper.element.tagName.toLowerCase()).toBe('span');
    expect(wrapper.classes()).toContain('icon');
    expect(wrapper.classes()).toContain('icon-plus');
  });

  it('applies default CSS variables', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        iconName: IconNames.Home,
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('--size: auto');
    expect(style).toContain('--text-color: var(--fg-default)');
    expect(style).toContain('--font-size: 0.875rem');
  });

  it('applies custom size', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        iconName: IconNames.Bell,
        size: '24px',
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('--size: 24px');
  });

  it('applies custom text color', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        iconName: IconNames.User,
        textColor: '#ff0000',
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('--text-color: #ff0000');
  });

  it('applies custom font size', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        iconName: IconNames.Search,
        fontSize: '1.5rem',
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('--font-size: 1.5rem');
  });

  it('applies all custom properties together', () => {
    const wrapper = mount(BaseIcon, {
      props: {
        iconName: IconNames.Clock,
        tagName: 'div',
        size: '32px',
        textColor: 'blue',
        fontSize: '2rem',
      },
    });

    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
    expect(wrapper.classes()).toContain('icon-clock');

    const style = wrapper.attributes('style');
    expect(style).toContain('--size: 32px');
    expect(style).toContain('--text-color: blue');
    expect(style).toContain('--font-size: 2rem');
  });

  it('renders different icon names correctly', () => {
    const icons = [
      IconNames.Star,
      IconNames.Android,
      IconNames.Home,
      IconNames.User,
      IconNames.Search,
    ];

    icons.forEach((iconName) => {
      const wrapper = mount(BaseIcon, {
        props: {
          iconName,
        },
      });

      expect(wrapper.classes()).toContain(`icon-${iconName}`);
    });
  });
});
