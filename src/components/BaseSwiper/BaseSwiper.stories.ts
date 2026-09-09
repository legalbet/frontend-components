import type { Meta, StoryObj } from '@storybook/vue3';
import { onMounted, onUnmounted } from 'vue';
import BaseSwiper from '@/components/BaseSwiper/BaseSwiper.vue';

const meta: Meta<typeof BaseSwiper> = {
  title: 'UI/Swiper',
  component: BaseSwiper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '[Ссылка на дизайн](https://www.figma.com/design/AotlqhTTWnmfcniFjomFZV/Components?node-id=21227-81049&t=eTIKhRXdouX1UgCM-4)',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BaseSwiper>;

export const CardsOverflow: Story = {
  name: 'Cards / Overflow nav',
  render: () => ({
    components: { BaseSwiper },
    setup() {
      const cards = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 }));
      return { cards };
    },
    template: `
      <div style="background:var(--bg-page); padding: 24px; max-width: 624px;">
        <BaseSwiper
          :items="cards"
          nav-style="light"
          slide-width="240px"
          :options="{
            slidesPerView: 'auto',
            spaceBetween: 16,
          }"
        >
          <template #slide="{ item }">
            <a href="javascript:void(0)" style="display: block; height: 100%">
              <article style="
                border-radius: 12px;
                padding: 16px;
                background: #9747FF;
                height: 140px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="font-weight: 600;">Объект {{ item.id }}</div>
              </article>
            </a>
          </template>
        </BaseSwiper>
      </div>
    `,
  }),
};

export const CardsFullWidthBottomLeftNav: Story = {
  name: 'Cards / Full-width + Bottom-left nav',
  render: () => ({
    components: { BaseSwiper },
    setup() {
      const cards = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 }));

      onMounted(() => {
        const el = document.createElement('style');
        el.id = 'story-fullwidth-bl-nav-styles';
        el.textContent = `
          .story-fullwidth-bl-nav .base-swiper__btn { top: auto !important; transform: none !important; bottom: 16px !important; }
          .story-fullwidth-bl-nav .base-swiper__btn--prev { left: 8px !important; }
          .story-fullwidth-bl-nav .base-swiper__btn--next { right: auto !important; left: 56px !important; }
        `;
        document.head.appendChild(el);
      });

      onUnmounted(() => {
        document.getElementById('story-fullwidth-bl-nav-styles')?.remove();
      });

      return { cards };
    },
    template: `
      <div class="story-fullwidth-bl-nav" style="background: var(--bg-page);">
        <p>Стили кнопок и положение на компоненте можно менять как угодно под конкретную задачу</p>
        <BaseSwiper
          :items="cards"
          nav-style="light"
          :options="{
            slidesPerView: 1,
            spaceBetween: 0,
            freeMode: false,
            breakpoints: {},
          }"
        >
          <template #slide="{ item }">
            <article style="
              border-radius: 12px;
              background: #9747FF;
              height: 320px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="font-weight: 600; font-size: 20px;">Объект {{ item.id }}</div>
            </article>
          </template>
        </BaseSwiper>
      </div>
    `,
  }),
};
