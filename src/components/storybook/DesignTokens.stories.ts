import ColorTokensViewer from '@fc/components/storybook/ColorTokensViewer.vue';

export default {
  title: 'Features/Elements/Colors',
  // tags: ['autodocs'],
};

export const Colors = () => ({
  components: { ColorTokensViewer },
  template: `
    <ColorTokensViewer
      title="UI tokens"
      :filter="name => !/-\\d+$/.test(name)"
    />
  `,
});
