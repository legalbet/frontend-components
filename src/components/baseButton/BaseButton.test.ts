import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import BaseButton from '@fc/components/baseButton/BaseButton.vue';
import { ButtonColor, ButtonTag, ButtonVariant } from '@fc/components/baseButton/types';
import { Size } from '@fc/components/types/BaseElementsType';
import { IconNames } from '@fc/components/baseIcon/iconNames';

describe('BaseButton', () => {
  const BaseIconStub = defineComponent({
    name: 'BaseIcon',
    props: {
      iconName: { type: String, required: true },
      size: { type: String, default: undefined },
      fontSize: { type: String, default: undefined },
      textColor: { type: String, default: undefined },
    },
    template: `<i class="base-icon-stub" :data-icon-name="iconName" :data-size="size" :data-font-size="fontSize" />`,
  });

  function mountButton(overrides: Record<string, unknown> = {}, slot = 'Click me') {
    return mount(BaseButton, {
      props: overrides,
      slots: { default: slot },
      global: {
        stubs: {
          BaseIcon: BaseIconStub,
        },
      },
    });
  }

  it('renders with defaults (button tag)', () => {
    const wrapper = mountButton();

    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    expect(wrapper.attributes('role')).toBe('button');
    expect(wrapper.attributes('disabled')).toBeUndefined();
    expect(wrapper.attributes('href')).toBeUndefined();

    expect(wrapper.classes()).toContain('button');
    expect(wrapper.classes()).toContain('button--primary');
    expect(wrapper.classes()).toContain('button--solid');
    expect(wrapper.classes()).toContain('medium');
    expect(wrapper.classes()).toContain('rectangle');
  });

  it('applies variant/color/size classes', () => {
    const wrapper = mountButton({
      variant: ButtonVariant.Outlined,
      color: ButtonColor.Secondary,
      size: Size.Small,
    });

    expect(wrapper.classes()).toContain('button--outlined');
    expect(wrapper.classes()).toContain('button--secondary');
    expect(wrapper.classes()).toContain('small');
  });

  it('renders as link when tag is "a" and applies href, but does not set disabled attribute', () => {
    const wrapper = mountButton({ tag: ButtonTag.Anchor, href: 'https://example.com', disabled: true }, 'Link');

    expect(wrapper.element.tagName.toLowerCase()).toBe('a');
    expect(wrapper.attributes('href')).toBe('https://example.com');
    expect(wrapper.attributes('role')).toBe('button');
    expect(wrapper.attributes('disabled')).toBeUndefined();
  });

  it('applies disabled attribute only for button tag', () => {
    const wrapper = mountButton({ disabled: true }, 'Disabled');
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('applies shape class', () => {
    const wrapper = mountButton({ shape: 'rounded' }, 'Rounded');
    expect(wrapper.classes()).toContain('rounded');
    expect(wrapper.classes()).not.toContain('rectangle');
  });

  it('applies customStyles to inline style', () => {
    const wrapper = mountButton(
      {
        customStyles: {
          width: '200px',
          height: '50px',
          backgroundColor: 'red',
        },
      },
      'Styled'
    );

    const style = wrapper.attributes('style') ?? '';
    expect(style).toContain('width: 200px');
    expect(style).toContain('height: 50px');
    expect(style).toContain('background-color: red');
  });

  it('renders start icon and normalizes icon params (size depends on button size)', () => {
    const wrapper = mountButton(
      {
        size: Size.Small,
        startIconParams: {
          iconName: IconNames.Plus,
        },
      },
      'Add'
    );

    const icon = wrapper.findAll('.base-icon-stub');
    expect(icon).toHaveLength(1);
    expect(icon[0]!.attributes('data-icon-name')).toBe(IconNames.Plus);
    expect(icon[0]!.attributes('data-size')).toBe('16px');
    expect(icon[0]!.attributes('data-font-size')).toBe('16px');
  });

  it('renders end icon and normalizes icon params', () => {
    const wrapper = mountButton(
      {
        size: Size.Large,
        endIconParams: {
          iconName: IconNames.ArrowRight,
        },
      },
      'Continue'
    );

    const icon = wrapper.findAll('.base-icon-stub');
    expect(icon).toHaveLength(1);
    expect(icon[0]!.attributes('data-icon-name')).toBe(IconNames.ArrowRight);
    expect(icon[0]!.attributes('data-size')).toBe('24px');
    expect(icon[0]!.attributes('data-font-size')).toBe('24px');
  });

  it('renders both icons', () => {
    const wrapper = mountButton(
      {
        startIconParams: { iconName: IconNames.ArrowDownload },
        endIconParams: { iconName: IconNames.Athletics },
      },
      'Download'
    );

    const icons = wrapper.findAll('.base-icon-stub');
    expect(icons).toHaveLength(2);
    expect(icons[0]!.attributes('data-icon-name')).toBe(IconNames.ArrowDownload);
    expect(icons[1]!.attributes('data-icon-name')).toBe(IconNames.Athletics);
  });
});
