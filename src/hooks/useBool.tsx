import { ref } from "vue"

const useBool = (initialValue: boolean) => {
  const bool = ref(initialValue)
  return {
    ref: bool,
    toggle: () => bool.value = !bool.value,
    on: () => bool.value = true,
    off: () => bool.value = false
  }
}
export default useBool;