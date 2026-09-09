import { onBeforeUnmount, onMounted, ref } from 'vue';
export default function useVisualViewportDiff() {
  const diff = ref(0);

  onMounted(() => {
    window.visualViewport?.addEventListener('resize', update);
  });

  onBeforeUnmount(() => {
    window.visualViewport?.removeEventListener('resize', update);
  });
  function update() {
    if (!window.visualViewport) return;
    const viewport = window.visualViewport;
    const heightDiff = window.innerHeight - viewport.height;
    // keyboard высота = разница между полной и доступной высотой
    diff.value = heightDiff > 0 ? heightDiff : 0;
  }

  return diff;
}
