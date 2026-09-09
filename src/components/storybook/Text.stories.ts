import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Features/Elements/Text',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const HEADING_CLASSES = [
  'heading-h1',
  'heading-h2',
  'heading-h3',
  'heading-h4',
  'heading-h5',
  'heading-h6',
  'heading-h56',
  'heading-h46',
  'heading-h42',
  'heading-h36',
  'heading-h28',
  'heading-h25',
  'heading-h22',
  'heading-h20',
  'heading-h18',
  'heading-h16',
];

const DISPLAY_CLASSES = ['display-lg', 'display-md', 'display-sm'];

const BODY_CLASSES = [
  'body-lg',
  'body-lg-st',
  'body-lg-xst',
  'body-md',
  'body-md-st',
  'body-md-xst',
  'body-sm',
  'body-sm-st',
  'body-sm-xst',
];

const CAPTION_CLASSES = [
  'caption-md',
  'caption-md-st',
  'caption-md-xst',
  'caption-sm',
  'caption-sm-st',
  'caption-sm-xst',
];

const PARAGRAPH_CLASSES = [
  'paragraph-p18',
  'paragraph-p18-semi',
  'paragraph-p16',
  'paragraph-p16-semi',
  'paragraph-p14',
  'paragraph-p14-semi',
];

const TEXT_CLASSES = [
  'text-t18',
  'text-t18-semi',
  'text-t16',
  'text-t16-medium',
  'text-t16-semi',
  'text-t14',
  'text-t14-medium',
  'text-t14-semi',
  'text-t12',
  'text-t12-medium',
  'text-t12-semi',
  'text-t12-caps',
  'text-t12-caps-semi',
  'text-t10',
  'text-t10-semi',
  'text-t10-caps',
  'text-t10-caps-semi',
];

const COLOR_CLASSES = ['color-default', 'color-soft', 'color-muted', 'color-linked', 'color-hover'];

const SAMPLE_TEXT = 'Дружок-пирожок';

const ALL_CLASS_GROUPS = [
  { title: 'Headings', classes: HEADING_CLASSES },
  { title: 'Display', classes: DISPLAY_CLASSES },
  { title: 'Body', classes: BODY_CLASSES },
  { title: 'Captions', classes: CAPTION_CLASSES },
  { title: 'Paragraphs', classes: PARAGRAPH_CLASSES },
  { title: 'Text', classes: TEXT_CLASSES },
  { title: 'Colors', classes: COLOR_CLASSES },
];

export const Typography: Story = {
  render: () => ({
    setup() {
      return { ALL_CLASS_GROUPS, SAMPLE_TEXT };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
        <section v-for="group in ALL_CLASS_GROUPS" :key="group.title" style="display:flex; flex-direction: column; gap: 12px;">
          <div style="font-weight: 700; font-size: 16px;">{{ group.title }}</div>

          <div style="display:flex; flex-direction: column; gap: 10px;">
            <div
              v-for="className in group.classes"
              :key="className"
              style="display:grid; grid-template-columns: 220px 1fr; gap: 16px; align-items: baseline;"
            >
              <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 12px; color: rgba(0,0,0,0.6);">
                .{{ className }}
              </div>
              <div :class="className" style="margin: 0;">
                {{ SAMPLE_TEXT }}
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
};
