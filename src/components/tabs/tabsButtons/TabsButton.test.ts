import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import TabsButtons from '@/components/tabs/tabsButtons/TabsButtons.vue';

describe('TabsButtons.vue', () => {
  let defaultTabs = [
    { id: 'tab1', text: 'Tab 1' },
    { id: 'tab2', text: 'Tab 2' },
    { id: 'tab3', text: 'Tab 3', disabled: true },
  ];

  let wrapper: any;

  beforeEach(async () => {
    defaultTabs = [
      { id: 'tab1', text: 'Tab 1' },
      { id: 'tab2', text: 'Tab 2' },
      { id: 'tab3', text: 'Tab 3', disabled: true },
    ];

    wrapper = await mountSuspended(TabsButtons, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    });
  });

  // 1. Рендеринг вкладок
  it('renders all tabs', () => {
    const tabs = wrapper.findAll('.tabs-buttons .tab');
    expect(tabs.length).toBe(3);
  });

  it('renders correct text for each tab', () => {
    const tabs = wrapper.findAll('.tabs-buttons .tab');
    expect(tabs[0].text()).toContain('Tab 1');
    expect(tabs[1].text()).toContain('Tab 2');
  });

  it('does not render if no tabs provided', async () => {
    const emptyWrapper = await mountSuspended(TabsButtons, { props: { tabs: [], modelValue: '', } });
    expect(emptyWrapper.find('.tabs-buttons').exists()).toBe(false);
  });

  it('generates fallback id if not provided', async () => {
    const wrapperNoIds = await mountSuspended(TabsButtons, {
      props: { tabs: [{ text: 'Hello' }],  modelValue: '' },
    });

    const tabEl = wrapperNoIds.find('.tabs-buttons .tab');
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
    const tab = wrapper.findAll('.tabs-buttons .tab')[1];
    await tab.trigger('click');

    const updateEvent = wrapper.emitted('update:modelValue');
    const changeEvent = wrapper.emitted('change');

    expect(updateEvent).toBeTruthy();
    expect(changeEvent).toBeTruthy();

    expect(updateEvent![0][0]).toBe('tab2');
    expect(changeEvent![0][0]).toEqual(expect.objectContaining({ id: 'tab2', text: 'Tab 2' }));
  });

  it('does not emit events when clicking a disabled tab', async () => {
    const disabledTab = wrapper.findAll('.tabs-buttons .tab')[2];
    await disabledTab.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  // 4. Слот
  it('renders custom slot content', async () => {
    const wrapperSlot = await mountSuspended(TabsButtons, {
      props: { tabs: defaultTabs, modelValue: 'tab1' },
      slots: {
        tab: ({ tab }: any) => h('span', {}, `Custom ${tab.text}`),
      },
    });

    const tab = wrapperSlot.find('.tabs-buttons .tab');
    expect(tab.text()).toContain('Custom Tab 1');
  });

  // 5. Disabled
  it('adds disabled class to disabled tabs', () => {
    const disabledTab = wrapper.findAll('.tabs-buttons .tab')[2];
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

    const renderedTabs = wrapper.findAll('.tabs-buttons .tab');
    expect(renderedTabs.length).toBe(2);
    expect(renderedTabs[0].text()).toContain('New Tab 1');
  });

  // 7. Эмиты
  it('emits correct payloads on click', async () => {
    const tab = wrapper.findAll('.tabs-buttons .tab')[1];
    await tab.trigger('click');

    const [update] = wrapper.emitted('update:modelValue')!;
    const [change] = wrapper.emitted('change')!;

    expect(update[0]).toBe('tab2');
    expect(change[0]).toEqual(expect.objectContaining({ id: 'tab2', text: 'Tab 2' }));
  });

  // 8. Рендеринг иконок и изображений
  it('renders start icon when startIconName is provided', async () => {
    defaultTabs[0].startIconName = 'arrow-right'
    const wrapperWithIcon = await mountSuspended(TabsButtons, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    });

    const icons = wrapperWithIcon.findAll('.icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders end icon when endIconName is provided', async () => {
    defaultTabs[0].endIconName = 'close';
    const wrapperWithIcon = await mountSuspended(TabsButtons, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',

      },
    });

    const icons = wrapperWithIcon.findAll('.icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  //TODO не работают NuxtImg в тестах

  // it('renders start image when startImgParams is provided', async () => {
  //   const src = '/skolkovo-head.png'
  //   const alt = 'Test'
  //   defaultTabs[0].startImgParams = { src , alt  };
  //   const wrapperWithImg = await mountSuspended(TabsButtons, {
  //     props: {
  //       tabs: defaultTabs,
  //       modelValue: 'tab1',
  //     },
  //   });
  //
  //   console.log('wrapperWithImg: ', wrapperWithImg.html())
  //
  //   const nuxtImg = wrapperWithImg.findComponent({ name: 'NuxtImg' });
  //   expect(nuxtImg.exists()).toBe(true);
  // });
  //
  // it('renders end image when endImgParams is provided', async () => {
  //   const wrapperWithImg = await mountSuspended(TabsButtons, {
  //     props: {
  //       tabs: defaultTabs,
  //       modelValue: 'tab1',
  //       endImgParams: { src: '/skolkovo-head.png', alt: 'Test' },
  //     },
  //   });
  //
  //   const nuxtImg = wrapperWithImg.findComponent({ name: 'NuxtImg' });
  //   expect(nuxtImg.exists()).toBe(true);
  // });
});
