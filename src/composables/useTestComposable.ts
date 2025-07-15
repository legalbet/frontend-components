import { ref } from 'vue';
export default function useTestComposable() {
  const a = ref('123');

  console.log(a.value);
}
