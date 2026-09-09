<template>
  <div class="breadcrumb-container" aria-label="Breadcrumb">
    <NuxtLink
      v-for="(crumb, index) in crumbsData.crumbs"
      :key="index"
      class="breadcrumb-item text-10"
      :class="{
        'breadcrumb-item--last': index === crumbsData.crumbs.length - 1,
      }"
      :to="crumb.link"
    >
      {{ crumb.name }}
      <div v-if="index < crumbsData.crumbs.length - 1">/</div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
type Crumb = { name: string; link: string };

defineProps<{
  crumbsData: {
    crumbs: Crumb[];
  };
}>();
</script>
<style lang="scss">
.breadcrumb-container {
  display: flex;
  gap: 8px;
  margin: 0.5rem 0 0.375rem;
  flex-wrap: nowrap;
  white-space: nowrap;
  scrollbar-width: none;
  max-width: 100%;
  overflow-x: auto;
}

.breadcrumb-item {
  cursor: pointer;
  color: var(--fg-soft);
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    color: var(--fg-hover);
  }
  &.breadcrumb-item--last {
    cursor: default;
    color: var(--fg-muted);
  }
}
</style>
