import type { Meta, StoryObj } from '@storybook/vue3';
import { onMounted, ref } from 'vue';

import { NoteStyle, NoteType, NoteSize } from '@fc/components/baseNote/NoteTypes';
import { SeoText } from '@fc/types/external-types';
import { DynamicDataType, StaticBlockNames, useDynamicData } from '@fc/types/external-types';
import { useConfigStore } from '@fc/composables/useConfigStore';
export default {
  title: 'Features/Elements/FroalaWidgets',
  tags: ['autodocs'],
} satisfies Meta;

type Story = StoryObj;

// Positive варианты
export const Default: Story = {
  args: {
    noteStyle: NoteStyle.Positive,
    type: NoteType.Outline,
    size: NoteSize.Large,
    text: 'Текст уведомления',
  },
  render: () => ({
    components: { SeoText },
    setup() {
      useConfigStore().set('baseUrl', 'https://legalbet.ru');
      const text = ref('Загрузка блока FroalaWidgets...');
      const { loadData: loadFroalaStaticBlock, dynamicData: froalaStaticBlockData } = useDynamicData({
        items: [
          {
            type: DynamicDataType.StaticBlock,
            name: StaticBlockNames.FroalaWidgets,
            params: { nocache: true },
            renderWidgets: { onlyData: true },
          },
        ],
      });

      onMounted(async () => {
        await loadFroalaStaticBlock();

        text.value =
          (froalaStaticBlockData[StaticBlockNames.FroalaWidgets] as string) || 'Нет данных для блока FroalaWidgets';
      });

      return { text };
    },
    template: `
      <SeoText :text="text" />
    `,
  }),
};
