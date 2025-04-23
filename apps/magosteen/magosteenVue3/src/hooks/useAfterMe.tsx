import { useMeStore } from "@/stores/useMeStore"
import { onMounted } from "vue"

export const useAfterMe = (fn: () => void) => {
  const meStore = useMeStore()
  onMounted(async () => {
    await meStore.me;
    fn()
  })
}