import { ref, computed, unref, watch, onMounted, onBeforeUnmount, type Ref } from 'vue';
type ModelValue = File | File[] | null;

type UploadTokenData = Record<string, unknown>;

type BaseFileInputProps = {
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  disabled?: boolean;
  capture?: boolean | 'user' | 'environment';
  getUploadToken?: () => Promise<UploadTokenData>;
  uploadFile?: (file: File, tokenData: UploadTokenData) => Promise<string>;
  uploadedPaths?: string[];
  isUploading?: boolean;
};

type BaseFileInputEmit = {
  (e: 'change', value: ModelValue): void;
  (e: 'exceed', payload: { maxFiles: number; attempted: number; files: File[] }): void;
  (e: 'update:uploadedPaths', value: string[]): void;
  (e: 'update:isUploading', value: boolean): void;
};

type BaseFileInputCallbacks = {
  onChange?: (value: ModelValue) => void;
  onExceed?: (payload: { maxFiles: number; attempted: number; files: File[] }) => void;
  onUpdateUploadedPaths?: (value: string[]) => void;
  onUpdateIsUploading?: (value: boolean) => void;
};

export function useBaseFileInput(params: {
  props: BaseFileInputProps | Ref<BaseFileInputProps>;
  emit?: BaseFileInputEmit;
  model: Ref<ModelValue>;
  callbacks?: BaseFileInputCallbacks;
}) {
  const { props, emit, model, callbacks } = params;
  const resolvedProps = computed(() => unref(props));

  const emitSafe: BaseFileInputEmit = (event, payload) => {
    if (emit) {
      emit(event as never, payload as never);
    }

    if (event === 'change') {
      callbacks?.onChange?.(payload as ModelValue);
      return;
    }
    if (event === 'exceed') {
      callbacks?.onExceed?.(payload as { maxFiles: number; attempted: number; files: File[] });
      return;
    }
    if (event === 'update:uploadedPaths') {
      callbacks?.onUpdateUploadedPaths?.(payload as string[]);
      return;
    }
    if (event === 'update:isUploading') {
      callbacks?.onUpdateIsUploading?.(Boolean(payload));
    }
  };

  const inputEl = ref<HTMLInputElement | null>(null);

  const selectedFiles = computed<File[]>(() => {
    if (!model.value) return [];
    return Array.isArray(model.value) ? model.value : [model.value];
  });

  const uploadedPathsState = ref<string[]>(resolvedProps.value.uploadedPaths ?? []);
  const isUploadingState = ref<boolean>(resolvedProps.value.isUploading ?? false);

  watch(
    () => resolvedProps.value.uploadedPaths,
    (next) => {
      uploadedPathsState.value = next ?? [];
    }
  );

  watch(
    () => resolvedProps.value.isUploading,
    (next) => {
      isUploadingState.value = next ?? false;
    }
  );

  const uploadedByFileKey = ref<Record<string, string>>({});

  const getFileKey = (file: File): string => {
    return `${file.name}::${file.size}::${file.lastModified}`;
  };

  const rebuildUploadedPathsState = (filesToUse: File[]) => {
    uploadedPathsState.value = filesToUse
      .map((f) => uploadedByFileKey.value[getFileKey(f)])
      .filter((p): p is string => Boolean(p));
    emitSafe('update:uploadedPaths', uploadedPathsState.value);
  };

  let uploadSeq = 0;
  watch(
    selectedFiles,
    async (nextFiles) => {
      if (!resolvedProps.value.getUploadToken || !resolvedProps.value.uploadFile) {
        uploadedByFileKey.value = {};
        uploadedPathsState.value = [];
        isUploadingState.value = false;
        emitSafe('update:uploadedPaths', []);
        emitSafe('update:isUploading', false);
        return;
      }

      const seq = ++uploadSeq;
      const currentKeys = new Set(nextFiles.map(getFileKey));

      const nextMap: Record<string, string> = {};
      for (const [key, path] of Object.entries(uploadedByFileKey.value)) {
        if (currentKeys.has(key)) {
          nextMap[key] = path;
        }
      }
      uploadedByFileKey.value = nextMap;
      rebuildUploadedPathsState(nextFiles);

      const notUploaded = nextFiles.filter((f) => !(getFileKey(f) in uploadedByFileKey.value));
      if (!notUploaded.length) return;

      isUploadingState.value = true;
      emitSafe('update:isUploading', true);
      try {
        const tokenData = await resolvedProps.value.getUploadToken();
        if (seq !== uploadSeq) return;

        for (const file of notUploaded) {
          const path = await resolvedProps.value.uploadFile(file, tokenData);
          if (seq !== uploadSeq) return;

          uploadedByFileKey.value = {
            ...uploadedByFileKey.value,
            [getFileKey(file)]: path,
          };
          rebuildUploadedPathsState(nextFiles);
        }
      } finally {
        if (seq === uploadSeq) {
          isUploadingState.value = false;
          emitSafe('update:isUploading', false);
        }
      }
    },
    { deep: false }
  );

  const isAtMax = computed(() => selectedFiles.value.length >= (resolvedProps.value.maxFiles ?? 1));
  const canAddMore = computed(() => !resolvedProps.value.disabled && !isAtMax.value);

  function resetInputValue() {
    if (!inputEl.value) return;
    inputEl.value.value = '';
  }

  function ensureInput() {
    if (typeof window === "undefined") return;
    if (inputEl.value) return;

    inputEl.value = document.createElement('input');
    inputEl.value.type = 'file';
    inputEl.value.style.position = 'fixed';
    inputEl.value.style.left = '-9999px';
    inputEl.value.style.top = '-9999px';
    inputEl.value.style.width = '1px';
    inputEl.value.style.height = '1px';
    inputEl.value.style.opacity = '0';
    inputEl.value.addEventListener('change', onInputChange);
    document.body.appendChild(inputEl.value);
  }

  onMounted(() => {
    ensureInput();
  });

  onBeforeUnmount(() => {
    if (typeof window === "undefined") return;
    if (!inputEl.value) return;
    inputEl.value.removeEventListener('change', onInputChange);
    inputEl.value.remove();
    inputEl.value = null;
  });

  function open() {
    if (!canAddMore.value) return;
    if (typeof window === "undefined") return;

    ensureInput();
    if (!inputEl.value) return;

    const p = resolvedProps.value;
    inputEl.value.accept = p.accept ?? '';
    inputEl.value.multiple = Boolean(p.multiple);
    inputEl.value.disabled = Boolean(p.disabled);
    if (p.capture !== undefined) {
      inputEl.value.capture = p.capture as never;
    }

    resetInputValue();
    inputEl.value.click();
  }

  function clear() {
    model.value = resolvedProps.value.multiple ? [] : null;
    uploadedByFileKey.value = {};
    uploadedPathsState.value = [];
    isUploadingState.value = false;
    emitSafe('update:uploadedPaths', []);
    emitSafe('update:isUploading', false);
    emitSafe('change', model.value);
    resetInputValue();
  }

  function remove(index: number) {
    if (!selectedFiles.value.length) return;

    const next = selectedFiles.value.filter((_, i) => i !== index);
    model.value = resolvedProps.value.multiple ? next : (next[0] ?? null);

    const nextKeys = new Set(next.map(getFileKey));
    const nextMap: Record<string, string> = {};
    for (const [key, path] of Object.entries(uploadedByFileKey.value)) {
      if (nextKeys.has(key)) {
        nextMap[key] = path;
      }
    }
    uploadedByFileKey.value = nextMap;
    rebuildUploadedPathsState(next);

    emitSafe('change', model.value);
    resetInputValue();
  }

  function onInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const selected = Array.from(target.files ?? []);

    if (!selected.length) {
      resetInputValue();
      return;
    }

    const incoming = resolvedProps.value.multiple ? selected : [selected[0]!];
    const combined = resolvedProps.value.multiple ? [...selectedFiles.value, ...incoming] : incoming;

    const limit = resolvedProps.value.maxFiles ?? 1;
    if (combined.length > limit) {
      const next = combined.slice(0, limit);
      emitSafe('exceed', { maxFiles: limit, attempted: combined.length, files: combined });
      model.value = resolvedProps.value.multiple ? next : (next[0] ?? null);
    } else {
      model.value = resolvedProps.value.multiple ? combined : (combined[0] ?? null);
    }

    emitSafe('change', model.value);
    resetInputValue();
  }

  return {
    open,
    clear,
    remove,
    selectedFiles,

    uploadedPathsState,
    isUploadingState,

    isAtMax,
    canAddMore,
  };
}
