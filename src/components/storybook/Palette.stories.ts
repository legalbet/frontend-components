import ColorTokensViewer from '@/components/storybook/ColorTokensViewer.vue';

export default {
  title: 'Features/Elements/Color Palette',
  tags: ['autodocs'],
};

export const ColorPalette = () => ({
  components: { ColorTokensViewer },
  template: `
    <ColorTokensViewer
      title="palette"
      :filter="name => /-\\d+$/.test(name)"
    />
  `,
});
