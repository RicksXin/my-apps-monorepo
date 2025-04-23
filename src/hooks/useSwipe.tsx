import { computed, onMounted, onUnmounted, ref, Ref } from 'vue';

type Point = { x: number; y: number };

interface OptionsProps {
  beforeStart?: (e: TouchEvent) => void;
  beforeMove?: (e: TouchEvent) => void;
  beforeEnd?: (e: TouchEvent) => void;
  endStart?: (e: TouchEvent) => void;
  endMove?: (e: TouchEvent) => void;
  endEnd?: (e: TouchEvent) => void;
}

export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: OptionsProps) => {
  const start = ref<Point>();
  const end = ref<Point>();
  const swiping = ref(false);
  const distance = computed(() => {
    if (!start.value || !end.value) return undefined;
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    };
  });
  const direction = computed(() => {
    if (!swiping) return '';
    if (!distance.value) return '';
    const { x, y } = distance.value;
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left';
    } else {
      return y > 0 ? 'down' : 'up';
    }
  });
  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e);
    e.preventDefault();
    swiping.value = true;
    start.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    end.value = undefined;
    options?.endStart?.(e);
  };
  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e);
    e.preventDefault();
    end.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    options?.endMove?.(e);
  };
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e);
    e.preventDefault();
    swiping.value = false;
    options?.endEnd?.(e);
  };
  onMounted(() => {
    if (!element.value) return;
    element.value?.addEventListener('touchstart', onStart);
    element.value?.addEventListener('touchmove', onMove);
    element.value?.addEventListener('touchend', onEnd);
  });
  onUnmounted(() => {
    if (!element.value) return;
    element.value?.removeEventListener('touchstart', onStart);
    element.value?.removeEventListener('touchmove', onMove);
    element.value?.removeEventListener('touchend', onEnd);
  });
  return {
    swiping,
    distance,
    direction,
    start,
    end,
  };
};
