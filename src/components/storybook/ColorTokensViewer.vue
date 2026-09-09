<template>
  <div class="tokens-story">
    <input v-model="search" :placeholder="`Search ${title || 'tokens'}...`" class="tokens-story__search" />

    <div v-for="(groupTokens, groupName) in filteredGroups" :key="groupName" class="tokens-story__group">
      <details open class="tokens-story__details">
        <summary class="tokens-story__summary">{{ groupName }} ({{ Object.keys(groupTokens).length }})</summary>

        <div class="tokens-story__items">
          <div v-for="(value, name) in groupTokens" :key="name" class="tokens-story__item">
            <div class="tokens-story__box color" :style="{ backgroundColor: value }"></div>
            <div class="tokens-story__name">{{ name }}</div>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref computed onMounted } from 'vue';
interface Props {
  filter?: (name: string) => boolean;
  title?: string;
}

const props = defineProps<Props>();
const tokens = ref<Record<string, string>>({});
const search = ref('');

const loadTokens = () => {
  const styles = getComputedStyle(document.documentElement);
  const result: Record<string, string> = {};

  for (let i = 0; i < styles.length; i++) {
    const name = styles[i];
    // игнорируем radius, spacing, padding
    if (
      name?.startsWith('--') &&
      !name.includes('radius') &&
      !name.includes('spacing') &&
      !name.includes('padding') &&
      (!props.filter || props.filter(name))
    ) {
      result[name] = styles.getPropertyValue(name).trim();
    }
  }

  tokens.value = result;
};

onMounted(loadTokens);

const groupedTokens = computed(() => {
  const groups: Record<string, Record<string, string>> = {};
  Object.entries(tokens.value).forEach(([name, value]) => {
    const clean = name.replace(/^--/, '');
    const group = clean.split('-')[0];
    if (!groups[group]) groups[group] = {};
    groups[group][name] = value;
  });

  Object.keys(groups).forEach((group) => {
    const entries = Object.entries(groups[group]);
    const isPalette = entries.some(([name]) => /-\d+$/.test(name));
    if (isPalette) {
      entries.sort((a, b) => parseInt(a[0].match(/-(\d+)$/)![1]) - parseInt(b[0].match(/-(\d+)$/)![1]));
      groups[group] = Object.fromEntries(entries);
    }
  });

  return groups;
});

const filteredGroups = computed(() => {
  const term = search.value.toLowerCase();
  if (!term) return groupedTokens.value;

  const result: Record<string, Record<string, string>> = {};
  for (const [group, items] of Object.entries(groupedTokens.value)) {
    const filtered = Object.entries(items).filter(
      ([name, value]) => name.toLowerCase().includes(term) || value.toLowerCase().includes(term)
    );
    if (filtered.length > 0) result[group] = Object.fromEntries(filtered);
  }
  return result;
});
</script>

<style scoped lang="scss">
.tokens-story {
  padding: 16px;
  max-width: 900px;

  &__search {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 16px;
  }

  &__group {
    margin-bottom: 24px;
  }

  &__details summary {
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 8px;
  }

  &__item {
    max-width: min-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .tokens-story__box {
      width: 60px;
      height: 60px;
      border: 1px solid #ccc;
      margin-bottom: 4px;
      border-radius: 8px;
    }

    & .tokens-story__name {
      font-size: 12px;
      text-align: center;
      word-break: break-word;
    }
  }
}
</style>
