import type { Meta, StoryObj } from '@storybook/vue3';

import { NoteStyle, NoteType, NoteSize } from '@/components/baseNote/NoteTypes';
import BaseNote from '@/components/baseNote/BaseNote.vue';
import { IconNames } from '@/components/baseIcon/iconNames';

const meta = {
  title: 'UI/Note',
  component: BaseNote,
  tags: ['autodocs'],
  argTypes: {
    noteStyle: {
      control: { type: 'select' },
      options: Object.values(NoteStyle),
      description: 'Стиль уведомления (определяет цвет и иконку)',
    },
    type: {
      control: { type: 'select' },
      options: Object.values(NoteType),
      description: 'Тип отображения (outline или fill)',
    },
    size: {
      control: { type: 'select' },
      options: Object.values(NoteSize),
      description: 'Размер уведомления',
    },
    text: {
      control: { type: 'text' },
      description: 'Текст уведомления',
    },
    customIconName: {
      control: { type: 'select' },
      options: Object.values(IconNames),
      description: 'Имя иконки из IconNames',
    },
    hideIcon: {
      control: { type: 'boolean' },
      description: 'Скрыть иконку',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=13888-31792&t=tYrngOASHX4QUe7i-4)',
      },
    },
  },
} satisfies Meta<typeof BaseNote>;

export default meta;
type Story = StoryObj<typeof meta>;

// Positive варианты
export const Default: Story = {
  args: {
    noteStyle: NoteStyle.Positive,
    type: NoteType.Outline,
    size: NoteSize.Large,
    text: 'Текст уведомления',
  },
  render: (args) => ({
    components: { BaseNote },
    setup() {
      return { args };
    },
    template: `
      <BaseNote v-bind="args" />
    `,
  }),
};

export const NoIcon: Story = {
  args: {
    noteStyle: NoteStyle.Neutral,
    type: NoteType.Outline,
    size: NoteSize.Large,
    text: 'Текст уведомления без иконки',
    hideIcon: true,
  },
  render: (args) => ({
    components: { BaseNote },
    setup() {
      return { args };
    },
    template: `
      <BaseNote v-bind="args" />
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { BaseNote },
    setup() {
      return { NoteStyle, NoteType, NoteSize };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
        <div>
          <h3 style="margin-bottom: 12px;">Positive (Успешно)</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <BaseNote
              :noteStyle="NoteStyle.Positive"
              :type="NoteType.Outline"
              text="Текст уведомления"
            />
            <BaseNote
              :noteStyle="NoteStyle.Positive"
              :type="NoteType.Fill"
              text="Текст уведомления"
            />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px;">Negative (Ошибка)</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <BaseNote
              :noteStyle="NoteStyle.Negative"
              :type="NoteType.Outline"
              text="Текст уведомления"
            />
            <BaseNote
              :noteStyle="NoteStyle.Negative"
              :type="NoteType.Fill"
              text="Текст уведомления"
            />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px;">Neutral (Информация)</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <BaseNote
              :noteStyle="NoteStyle.Neutral"
              :type="NoteType.Outline"
              text="Текст уведомления"
            />
            <BaseNote
              :noteStyle="NoteStyle.Neutral"
              :type="NoteType.Fill"
              text="Текст уведомления"
            />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px;">Размеры</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <BaseNote
              :noteStyle="NoteStyle.Positive"
              :type="NoteType.Outline"
              :size="NoteSize.Large"
              text="Текст уведомления"
            />
            <BaseNote
              :noteStyle="NoteStyle.Positive"
              :type="NoteType.Outline"
              :size="NoteSize.Small"
              text="Текст уведомления"
            />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px;">С другими иконками</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <BaseNote
              :noteStyle="NoteStyle.Positive"
              :type="NoteType.Outline"
              :size="NoteSize.Large"
              :custom-icon-name="'android'"
              text="Текст уведомления"
            />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px;">Без иконки</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <BaseNote
              :noteStyle="NoteStyle.Positive"
              :type="NoteType.Outline"
              :hide-icon="true"
              text="Текст уведомления без иконки"
            />
            <BaseNote
              :noteStyle="NoteStyle.Negative"
              :type="NoteType.Fill"
              :hide-icon="true"
              text="Текст уведомления без иконки"
            />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px;">С кастомным содержимым</h3>
          <BaseNote
            :noteStyle="NoteStyle.Positive"
            :type="NoteType.Fill"
          >
            <strong>Важно:</strong> Это уведомление содержит <em>HTML-разметку</em> и может включать <a href="#">Текст уведомления</a>
          </BaseNote>
        </div>
      </div>
    `,
  }),
};
