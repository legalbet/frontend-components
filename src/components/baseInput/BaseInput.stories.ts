import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BaseInput from '@/components/baseInput/BaseInput.vue';
import { InputSizeType, InputType } from '@/components/baseInput/types';

const meta = {
  title: 'UI/Input',
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {
    inputSizeType: {
      control: { type: 'select' },
      options: Object.values(InputSizeType),
      description: 'Размер инпута',
    },
    type: {
      control: { type: 'select' },
      options: Object.values(InputType),
      description: 'Тип инпута (text, password и т.д.)',
    },
    disabled: { control: { type: 'boolean' }, description: 'Заблокированное состояние' },
    label: { control: { type: 'text' }, description: 'Статичный лейбл над инпутом' },
    labelDescription: { control: { type: 'text' }, description: 'Дополнительное описание рядом с лейблом' },
    placeholder: { control: { type: 'text' }, description: 'Плавающий placeholder' },
    errors: { control: { type: 'object' }, description: 'Список ошибок' },
    fullWidth: { control: { type: 'boolean' }, description: 'Растянуть на всю ширину' },
  },
  args: {
    id: 'input-1',
    label: 'Лейбл',
    placeholder: 'Введите значение',
    modelValue: '',
    inputSizeType: InputSizeType.Base,
    disabled: false,
    type: InputType.Text,
    errors: [],
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=21238-9713&m=dev)',
      },
    },
  },
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const createInputStory = (args: any) => ({
  components: { BaseInput },
  setup() {
    const value = ref(args.modelValue ?? '');
    return { args, value };
  },
  template: `
    <div style="width: 400px;">
      <BaseInput
        :id="args.id"
        v-model="value"
        :label="args.label"
        :label-description="args.labelDescription"
        :placeholder="args.placeholder"
        :type="args.type"
        :errors="args.errors"
        :input-size-type="args.inputSizeType"
        :disabled="args.disabled"
        :full-width="args.fullWidth"
      />
    </div>
  `,
});

export const Default: Story = {
  render: createInputStory,
};

export const WithLabelDescription: Story = {
  args: {
    label: 'Email',
    labelDescription: '(необязательно)',
    placeholder: 'example@mail.com',
  },
  render: createInputStory,
};

export const Password: Story = {
  args: {
    label: 'Пароль',
    placeholder: 'Введите пароль',
    type: InputType.Password,
  },
  render: createInputStory,
};

export const Small: Story = {
  args: {
    label: 'Маленький инпут',
    placeholder: 'Введите значение',
    inputSizeType: InputSizeType.Small,
  },
  render: createInputStory,
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@mail.com',
    modelValue: 'invalid-email',
    errors: ['Неверный формат email'],
  },
  render: createInputStory,
};

export const Disabled: Story = {
  args: {
    label: 'Заблокировано',
    placeholder: 'Недоступно для ввода',
    modelValue: 'Значение',
    disabled: true,
  },
  render: createInputStory,
};

export const AllVariants: Story = {
  render: () => ({
    components: { BaseInput },
    setup() {
      const v = ref({
        empty: '',
        filled: 'Заполненное значение',
        password: '',
        small: '',
        error: 'invalid',
        disabled: 'Значение',
        description: '',
      });
      return { v };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <BaseInput id="i1" label="Пустой" placeholder="Введите значение" v-model="v.empty" />
        <BaseInput id="i2" label="Заполненный" placeholder="Введите значение" v-model="v.filled" />
        <BaseInput id="i3" label="Пароль" placeholder="Введите пароль" v-model="v.password" type="password" />
        <BaseInput id="i4" label="Маленький" placeholder="Введите значение" v-model="v.small" input-size-type="small" />
        <BaseInput id="i5" label="С ошибкой" placeholder="Введите значение" v-model="v.error" :errors="['Обязательное поле']" />
        <BaseInput id="i6" label="Отключён" placeholder="Недоступно" v-model="v.disabled" disabled />
        <BaseInput id="i7" label="С описанием" label-description="(необязательно)" placeholder="Введите значение" v-model="v.description" />
      </div>
    `,
  }),
};
