import { onBeforeMount, ref, watch } from 'vue';
export function useTheme() {
  const isClient = typeof window !== 'undefined';

  const theme = ref(isClient ? localStorage.getItem('theme') || 'light' : 'light');

  function applyTheme(theme: string) {
    if (!isClient) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  onBeforeMount(() => applyTheme(theme.value));

  watch(theme, (newTheme) => applyTheme(newTheme));

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  return { theme, toggleTheme };
}
