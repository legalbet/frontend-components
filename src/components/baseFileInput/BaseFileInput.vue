<script setup lang="ts">
import { toRefs } from 'vue';

import { useBaseFileInput } from '@/components/baseFileInput/composables/useBaseFileInput';

type ModelValue = File | File[] | null;

const props = withDefaults(
  defineProps<{
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    disabled?: boolean;
    capture?: boolean | 'user' | 'environment';
    getUploadToken?: () => Promise<Record<string, unknown>>;
    uploadFile?: (file: File, tokenData: Record<string, unknown>) => Promise<string>;
    uploadedPaths?: string[];
    isUploading?: boolean;
  }>(),
  {
    multiple: false,
    maxFiles: 1,
    accept: '',
    disabled: false,
    capture: undefined,
    getUploadToken: undefined,
    uploadFile: undefined,
    uploadedPaths: () => [],
    isUploading: false,
  }
);

const { disabled, maxFiles } = toRefs(props);

const emit = defineEmits<{
  (e: 'change', value: ModelValue): void;
  (e: 'exceed', payload: { maxFiles: number; attempted: number; files: File[] }): void;
  (e: 'update:uploadedPaths', value: string[]): void;
  (e: 'update:isUploading', value: boolean): void;
}>();

const model = defineModel<ModelValue>({ required: false, default: null });

const { open, clear, remove, selectedFiles, uploadedPathsState, isUploadingState, isAtMax, canAddMore } =
  useBaseFileInput({ props, emit, model });
</script>

<template>
  <slot
    :open="open"
    :clear="clear"
    :remove="remove"
    :files="selectedFiles"
    :uploadedPaths="uploadedPathsState"
    :isUploading="isUploadingState"
    :disabled="disabled"
    :maxFiles="maxFiles"
    :isAtMax="isAtMax"
    :canAddMore="canAddMore"
  />
</template>
