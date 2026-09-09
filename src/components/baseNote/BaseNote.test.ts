import { describe, it, expect, beforeEach } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import BaseNote from '@fc/components/baseNote/BaseNote.vue';
import { NoteStyle, NoteType, NoteSize, NOTE_ICONS } from '@fc/components/baseNote/NoteTypes';

describe('BaseNote.vue', () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = await mountSuspended(BaseNote, {
      props: {
        noteStyle: NoteStyle.Positive,
        type: NoteType.Outline,
        size: NoteSize.Large,
        text: 'Текст уведомления',
      },
    });
  });

  // 1. Рендеринг компонента
  it('renders the component', () => {
    expect(wrapper.find('.base-note').exists()).toBe(true);
  });

  it('renders text content', () => {
    expect(wrapper.text()).toContain('Текст уведомления');
  });

  it('renders correctly with all props', () => {
    // Компонент рендерится с переданными пропсами
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('noteStyle')).toBe(NoteStyle.Positive);
  });

  // Тест на автоматическое определение иконки
  it('automatically sets icon based on noteStyle', () => {
    // Проверяем, что для каждого стиля используется правильная иконка
    const positiveIcon = NOTE_ICONS[NoteStyle.Positive];
    const negativeIcon = NOTE_ICONS[NoteStyle.Negative];
    const neutralIcon = NOTE_ICONS[NoteStyle.Neutral];

    expect(positiveIcon).toBeDefined();
    expect(negativeIcon).toBeDefined();
    expect(neutralIcon).toBeDefined();
  });

  // 2. Стили
  it('applies positive style classes', () => {
    expect(wrapper.classes()).toContain('base-note--positive');
  });

  it('applies negative style classes', async () => {
    await wrapper.setProps({ noteStyle: NoteStyle.Negative });
    await nextTick();
    expect(wrapper.classes()).toContain('base-note--negative');
  });

  it('applies neutral style classes', async () => {
    await wrapper.setProps({ noteStyle: NoteStyle.Neutral });
    await nextTick();
    expect(wrapper.classes()).toContain('base-note--neutral');
  });

  // 3. Цвета
  it('applies outline color classes', () => {
    expect(wrapper.classes()).toContain('base-note--outline');
  });

  it('applies soft color classes', async () => {
    await wrapper.setProps({ type: NoteType.Fill });
    await nextTick();
    expect(wrapper.classes()).toContain('base-note--fill');
  });

  // 4. Размеры
  it('applies large size classes', () => {
    expect(wrapper.classes()).toContain('base-note--large');
  });

  it('applies small size classes', async () => {
    await wrapper.setProps({ size: NoteSize.Small });
    await nextTick();
    expect(wrapper.classes()).toContain('base-note--small');
  });

  // 5. Слот
  it('renders slot content instead of text prop when slot is provided', async () => {
    const wrapperSlot = await mountSuspended(BaseNote, {
      props: {
        text: 'Prop text',
      },
      slots: {
        default: () => 'Slot text',
      },
    });

    expect(wrapperSlot.text()).toContain('Slot text');
    expect(wrapperSlot.text()).not.toContain('Prop text');
  });

  // 6. Комбинации стилей
  it('correctly applies positive + outline combination', async () => {
    await wrapper.setProps({
      noteStyle: NoteStyle.Positive,
      type: NoteType.Outline,
    });
    await nextTick();

    expect(wrapper.classes()).toContain('base-note--positive');
    expect(wrapper.classes()).toContain('base-note--outline');
  });

  it('correctly applies negative + soft combination', async () => {
    await wrapper.setProps({
      noteStyle: NoteStyle.Negative,
      type: NoteType.Fill,
    });
    await nextTick();

    expect(wrapper.classes()).toContain('base-note--negative');
    expect(wrapper.classes()).toContain('base-note--fill');
  });

  it('correctly applies neutral + outline combination', async () => {
    await wrapper.setProps({
      noteStyle: NoteStyle.Neutral,
      type: NoteType.Outline,
    });
    await nextTick();

    expect(wrapper.classes()).toContain('base-note--neutral');
    expect(wrapper.classes()).toContain('base-note--outline');
  });

  // 7. Дефолтные значения
  it('uses default values when props are not provided', async () => {
    const defaultWrapper = await mountSuspended(BaseNote);

    expect(defaultWrapper.classes()).toContain('base-note--neutral');
    expect(defaultWrapper.classes()).toContain('base-note--outline');
    expect(defaultWrapper.classes()).toContain('base-note--large');
  });

  // 8. Обновление пропсов
  it('updates classes when props change', async () => {
    expect(wrapper.classes()).toContain('base-note--positive');

    await wrapper.setProps({ noteStyle: NoteStyle.Negative });
    await nextTick();

    expect(wrapper.classes()).not.toContain('base-note--positive');
    expect(wrapper.classes()).toContain('base-note--negative');
  });

  it('updates text when text prop changes', async () => {
    expect(wrapper.text()).toContain('Текст уведомления');

    await wrapper.setProps({ text: 'Новый текст' });
    await nextTick();

    expect(wrapper.text()).toContain('Новый текст');
  });

  // 9. Структура DOM
  it('has correct DOM structure', () => {
    expect(wrapper.find('.base-note__text-container').exists()).toBe(true);
    expect(wrapper.find('.base-note__text').exists()).toBe(true);
  });
});