export const throttle = <T extends (...args: any[]) => any>(fn: T, time: number) => {
  let timer: number | NodeJS.Timeout | undefined = undefined;
  let result: ReturnType<T>;
  return (...args: Parameters<T>) => {
    if (timer) {
      return result;
    } else {
      result = fn(...args);
      timer = setTimeout(() => {
        timer = undefined;
      }, time);
      return result;
    }
  };
};
