import type { Meta, StoryObj } from '@storybook/vue3';

import { ref, computed } from 'vue';
import BaseIcon from '@fc/components/baseIcon/BaseIcon.vue';
import { IconNames } from '@fc/components/baseIcon/iconNames';

const meta = {
  title: 'UI/Icon',
  component: BaseIcon,
  tags: ['autodocs'],

  argTypes: {
    iconName: {
      control: { type: 'select' },
      options: Object.values(IconNames),
      description: 'Название иконки из enum IconNames',
    },
    tagName: {
      control: { type: 'text' },
      description: 'HTML тег для иконки (по умолчанию: "i")',
    },
    size: {
      control: { type: 'text' },
      description: 'Размер иконки - ширина и высота (по умолчанию: "auto")',
    },
    textColor: {
      control: { type: 'color' },
      description: 'Цвет иконки (по умолчанию: "white")',
    },
    fontSize: {
      control: { type: 'text' },
      description: 'Размер шрифта иконки (по умолчанию: "0.875rem")',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '[Ссылка на дизайн](https://www.figma.com/design/wN3mbNuxXTG5k7iQQkuRR8/Icon?node-id=0-1)',
      },
    },
  },
} satisfies Meta<typeof BaseIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: IconNames.Star,
    size: '32px',
    fontSize: '32px',
    textColor: '#333333',
  },
};

export const AllIcons: Story = {
  render: () => ({
    components: { BaseIcon },
    setup() {
      const searchQuery = ref('');
      const iconSize = ref('32px');
      const iconColor = ref('#333333');

      // Получаем все иконки из enum
      const allIcons = Object.values(IconNames);

      // Фильтруем иконки по поисковому запросу
      const filteredIcons = computed(() => {
        if (!searchQuery.value) {
          return allIcons;
        }
        const query = searchQuery.value.toLowerCase();
        return allIcons.filter((icon) => icon.toLowerCase().includes(query));
      });

      // Подсчёт всех иконок
      const totalIconsCount = allIcons.length;

      function copyIconName(iconName: string) {
        navigator.clipboard.writeText(iconName);
      }

      return {
        searchQuery,
        iconSize,
        iconColor,
        filteredIcons,
        totalIconsCount,
        copyIconName,
      };
    },
    template: `
      <div>
        <style>
          .icon-card {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
            padding: 10px 14px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            transition: all 0.2s;
            cursor: pointer;
          }
          .icon-card:hover {
            border-color: #007bff;
            box-shadow: 0 2px 8px rgba(0,123,255,0.1);
          }
        </style>

        <div style="position: sticky; top: 0; background: white; padding: 16px; border-bottom: 1px solid #ddd; margin-bottom: 24px; z-index: 10;">
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 200px;">
              <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">
                Поиск иконок
              </label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Введите название иконки..."
                style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
              />
            </div>
            <div style="min-width: 120px;">
              <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">
                Размер
              </label>
              <input
                v-model="iconSize"
                type="text"
                placeholder="32px"
                style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
              />
            </div>
            <div style="min-width: 120px;">
              <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">
                Цвет
              </label>
              <input
                v-model="iconColor"
                type="color"
                style="width: 100%; height: 38px; padding: 4px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;"
              />
            </div>
          </div>
          <div style="margin-top: 12px; font-size: 14px; color: #666;">
            Найдено иконок: <strong>{{ filteredIcons.length }}</strong> из <strong>{{ totalIconsCount }}</strong>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 0 16px;">
          <div
            v-for="icon in filteredIcons"
            :key="icon"
            class="icon-card"
            @click="copyIconName(icon)"
            :title="'Нажмите чтобы скопировать: ' + icon"
          >
            <BaseIcon
              :iconName="icon"
              :size="iconSize"
              :fontSize="iconSize"
              :textColor="iconColor"
            />
            <div style="
              font-size: 11px;
              text-align: left;
              word-break: break-word;
              color: #666;
              font-family: monospace;
              line-height: 1.3;
            ">
              {{ icon }}
            </div>
          </div>
        </div>

        <div
          v-if="filteredIcons.length === 0"
          style="
            text-align: center;
            padding: 40px;
            color: #999;
            font-size: 16px;
          "
        >
          Иконки не найдены. Попробуйте изменить поисковый запрос.
        </div>
      </div>
    `,
  }),
};
