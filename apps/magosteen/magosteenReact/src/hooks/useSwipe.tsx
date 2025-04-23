import { RefObject, useEffect, useState, useMemo } from 'react';

type Point = { x: number; y: number };

interface OptionsProps {
  beforeStart?: (e: TouchEvent) => void;
  beforeMove?: (e: TouchEvent) => void;
  beforeEnd?: (e: TouchEvent) => void;
  endStart?: (e: TouchEvent) => void;
  endMove?: (e: TouchEvent) => void;
  endEnd?: (e: TouchEvent) => void;
}

export const useSwipe = (element: RefObject<HTMLElement | undefined>, options?: OptionsProps) => {
  const [start, setStart] = useState<Point>();
  const [end, setEnd] = useState<Point>();
  const [swiping, setSwiping] = useState(false);
  const distance = useMemo(() => {
    if (!start || !end) return undefined;
    return {
      x: end.x - start.x,
      y: end.y - start.y,
    };
  }, [start, end]);
  const direction = useMemo<'left' | 'right' | 'down' | 'up' | ''>(() => {
    if (!swiping) return '';
    if (!distance) return '';
    const { x, y } = distance;
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left';
    } else {
      return y > 0 ? 'down' : 'up';
    }
  }, [swiping, distance]);
  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e);
    e.preventDefault();
    setSwiping(true);
    setStart(() => ({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }));
    setEnd(undefined);
    options?.endStart?.(e);
  };
  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e);
    e.preventDefault();
    setEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    options?.endMove?.(e);
  };
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e);
    e.preventDefault();
    setSwiping(false);
    options?.endEnd?.(e);
  };
  useEffect(() => {
    if (!element.current) return;
    element?.current?.addEventListener('touchstart', onStart);
    element?.current?.addEventListener('touchmove', onMove);
    element?.current?.addEventListener('touchend', onEnd);
    return () => {
      if (!element.current) return;
      element?.current?.removeEventListener('touchstart', onStart);
      element?.current?.removeEventListener('touchmove', onMove);
      element?.current?.removeEventListener('touchend', onEnd);
    };
  }, []);
  return {
    swiping,
    distance,
    direction,
    start,
    end,
  };
};
