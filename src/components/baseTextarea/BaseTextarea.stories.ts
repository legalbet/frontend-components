import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BaseTextarea from '@/components/baseTextarea/BaseTextarea.vue';

const meta = {
  title: 'UI/Textarea',
  component: BaseTextarea,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Плавающий лейбл' },
    placeholder: { control: 'text', description: 'Текст placeholder' },
    height: { control: 'text', description: 'Высота textarea (px или auto)' },
    errors: { control: 'object', description: 'Список ошибок' },
    options: { control: 'boolean', description: 'Показать кнопку options-пикера' },
  },
  args: {
    id: 'textarea-1',
    modelValue: '',
    label: 'Лейбл',
    placeholder: 'Введите текст...',
    height: 'auto',
    errors: [],
    options: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=22424-11774&t=393yNUWCOzkMzoNZ-4)',
      },
    },
  },
} satisfies Meta<typeof BaseTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const createTextareaStory = (args: any) => ({
  components: { BaseTextarea },
  setup() {
    const text = ref(args.modelValue ?? '');
    return { args, text };
  },
  template: `
    <div style="width: 500px;">
      <BaseTextarea
        :id="args.id"
        v-model="text"
        :label="args.label"
        :placeholder="args.placeholder"
        :height="args.height"
        :errors="args.errors"
        :options="args.options"
      />
    </div>
  `,
});

export const Default: Story = {
  render: createTextareaStory,
};

export const Withoptions: Story = {
  args: {
    label: 'Комментарий',
    placeholder: 'Напишите комментарий...',
    options: true,
  },
  render: createTextareaStory,
};

export const WithText: Story = {
  args: {
    label: 'Описание',
    placeholder: 'Введите описание...',
    modelValue: 'Уже есть введённый текст',
  },
  render: createTextareaStory,
};

export const FixedHeight: Story = {
  args: {
    label: 'Фиксированная высота',
    placeholder: 'Введите текст...',
    height: '150',
    options: true,
  },
  render: createTextareaStory,
};

export const WithError: Story = {
  args: {
    label: 'Обязательное поле',
    placeholder: 'Введите текст...',
    errors: ['Поле не может быть пустым'],
  },
  render: createTextareaStory,
};

export const AllVariants: Story = {
  render: () => ({
    components: { BaseTextarea },
    setup() {
      const v = ref({
        empty: '',
        filled: 'Заполненный текст в textarea для примера.',
        options: '',
        error: '',
        fixed: '',
      });
      return { v };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 500px;">
        <BaseTextarea id="ta1" v-model="v.empty" label="Пустой" placeholder="Введите текст..." />
        <BaseTextarea id="ta2" v-model="v.filled" label="Заполненный" placeholder="Введите текст..." />
        <BaseTextarea id="ta3" v-model="v.options" label="С options-пикером" placeholder="Напишите комментарий..." :options="true" />
        <BaseTextarea id="ta4" v-model="v.fixed" label="Фиксированная высота" placeholder="Введите текст..." :height="120" :options="true" />
        <BaseTextarea id="ta5" v-model="v.error" label="С ошибкой" placeholder="Введите текст..." :errors="['Обязательное поле']" />
      </div>
    `,
  }),
};
