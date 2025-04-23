import {
  forwardRef,
  ForwardRefRenderFunction,
  MouseEvent,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Button from '@/Components/Button';

interface TimerButtonProps {
  countFrom?: number;
  disabled: boolean;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}
interface TimerButtonRef {
  startCount: () => void;
}
const TimerButton: ForwardRefRenderFunction<TimerButtonRef, TimerButtonProps> = (
  { countFrom = 60, disabled = false, onClick },
  ref
) => {
  const timer = useRef<number | NodeJS.Timer>();
  const [count, setCount] = useState<number>(countFrom);
  const isCounting = useMemo(() => !!timer.current, [timer.current]);
  useImperativeHandle(
    ref,
    () => ({
      startCount: () => {
        timer.current = setInterval(() => {
          setCount((pre) => pre - 1);
          if (count === 0) {
            clearInterval(timer.current as NodeJS.Timer);
            timer.current = undefined;
            setCount(countFrom);
          }
        }, 1000);
      },
    }),
    []
  );
  return (
    <Button disabled={isCounting} onClick={onClick}>
      {isCounting ? `${count}秒后重新发送` : '发送验证码'}
    </Button>
  );
};

export default forwardRef(TimerButton);
