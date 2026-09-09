import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import BaseTabs from '@/components/tabs/baseTabs/BaseTabs.vue';
import {IconNames} from "~/shared/ui";

describe('BaseTabs.vue', () => {
  const defaultTabs = [
    { id: 'tab1', text: 'Tab 1' },
    { id: 'tab2', text: 'Tab 2', startIconName: IconNames.Star, counter: '89' },
    { id: 'tab3', text: 'Tab 3', disabled: true },
    { id: 'tab4', text: 'Tab 4', href: 'tab-with-href' },
  ];

  let wrapper: any;

  beforeEach(async () => {
    wrapper = await mountSuspended(BaseTabs, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    });
  });

  // 1. Рендеринг вкладок
  it('renders all tabs', () => {
    const tabs = wrapper.findAll('.tab');
    expect(tabs.length).toBe(4);
  });

  it('renders correct text for each tab', () => {
    const tabs = wrapper.findAll('.tab');
    expect(tabs[0].text()).toContain('Tab 1');
    expect(tabs[1].text()).toContain('Tab 2');
  });

  it('renders counter correct', () => {
    const tabs = wrapper.findAll('.tab');
    expect(tabs[1].text()).toContain('89');
  });

  it('renders icon if params are provided', () => {
    const tabs = wrapper.findAll('.tab');
    const icon = tabs[1].find('.base-icon');
    expect(icon).toBeTruthy();
  });

  it('does not render if no tabs provided', async () => {
    const emptyWrapper = await mountSuspended(BaseTabs, { props: { tabs: [],  modelValue: '' } });
    expect(emptyWrapper.find('.base-tabs').exists()).toBe(false);
  });

  it('use <a> tag when href is provided', () => {
    const tabs = wrapper.findAll('.tab')
    const tabWithHref = tabs.find(el => el.text().includes('Tab 4'))

    expect(tabWithHref).toBeTruthy()
    expect(tabWithHref.element.tagName.toLowerCase()).toBe('a')
    expect(tabWithHref.attributes('href')).toBe('tab-with-href')

    const nonHrefTab = tabs.find((el) => el.text().includes('Tab 1'))
    expect(nonHrefTab!.element.tagName.toLowerCase()).not.toBe('a')
  })

  it('generates fallback id if not provided', async () => {
    const wrapperNoIds = await mountSuspended(BaseTabs, {
      props: { tabs: [{ text: 'Hello' }],  modelValue: '' },
    });

    const tabEl = wrapperNoIds.find('.tab');
    await tabEl.trigger('click');

    const emitted = wrapperNoIds.emitted('update:modelValue')?.[0]?.[0];
    expect(emitted).toBe('tab-0-Hello');
  });

  // 2. Активный таб
  it('marks correct tab as active based on modelValue', () => {
    const activeTab = wrapper.find('.tab--active');
    expect(activeTab.text()).toContain('Tab 1');
  });

  it('updates active tab when modelValue changes', async () => {
    await wrapper.setProps({ modelValue: 'tab2' });
    await nextTick();
    const activeTab = wrapper.find('.tab--active');
    expect(activeTab.text()).toContain('Tab 2');
  });

  // 3. Клики и события
  it('emits update:modelValue and change when clicking a non-active tab', async () => {
    const tab = wrapper.findAll('.tab')[1];
    await tab.trigger('click');

    const updateEvent = wrapper.emitted('update:modelValue');
    const changeEvent = wrapper.emitted('change');

    expect(updateEvent).toBeTruthy();
    expect(changeEvent).toBeTruthy();

    expect(updateEvent![0][0]).toBe('tab2');
    expect(changeEvent![0][0]).toEqual(expect.objectContaining({ id: 'tab2', text: 'Tab 2' }));
  });

  it('does not emit events when clicking a disabled tab', async () => {
    const disabledTab = wrapper.findAll('.tab')[2];
    await disabledTab.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  // 4. Слот
  it('renders custom slot content', async () => {
    const wrapperSlot = await mountSuspended(BaseTabs, {
      props: { tabs: defaultTabs, modelValue: 'tab1' },
      slots: {
        tab: ({ tab }: any) => h('span', {}, `Custom ${tab.text}`),
      },
    });

    const tab = wrapperSlot.find('.tab');
    expect(tab.text()).toContain('Custom Tab 1');
  });

  // 5. Disabled
  it('adds disabled class to disabled tabs', () => {
    const disabledTab = wrapper.findAll('.tab')[2];
    expect(disabledTab.classes()).toContain('tab--disabled');
  });

  // 6. Обновление пропсов
  it('reacts correctly when tabs prop changes', async () => {
    const newTabs = [
      { id: 'x1', text: 'New Tab 1' },
      { id: 'x2', text: 'New Tab 2' },
    ];
    await wrapper.setProps({ tabs: newTabs });
    await nextTick();

    const renderedTabs = wrapper.findAll('.tab');
    expect(renderedTabs.length).toBe(2);
    expect(renderedTabs[0].text()).toContain('New Tab 1');
  });

  // 7. Эмиты
  it('emits correct payloads on click', async () => {
    const tab = wrapper.findAll('.tab')[1];
    await tab.trigger('click');

    const [update] = wrapper.emitted('update:modelValue')!;
    const [change] = wrapper.emitted('change')!;

    expect(update[0]).toBe('tab2');
    expect(change[0]).toEqual(expect.objectContaining({ id: 'tab2', text: 'Tab 2' }));
  });
});
