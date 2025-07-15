import { describe, it, expect } from 'vitest';
import HelloWorld from '../../src/components/HelloWorld.vue';
import { mount } from '@vue/test-utils';

describe('Test Hello World', () => {
  it('Should render', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Test Test Test',
      },
    });

    expect(wrapper.text()).toContain('Test Test Test');
  });
});
