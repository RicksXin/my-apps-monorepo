import { Time } from '@/utils/time';
import { FC, useMemo } from 'react';
interface DateTimeProps {
  value: string | Date;
  format?: string;
}

const DateTime: FC<DateTimeProps> = ({ value, format = 'YYYY-MM-DD HH:mm:ss' }) => {
  const displayTime = useMemo(() => new Time(value).format(format), []);
  return <div>{displayTime}</div>;
};
export default DateTime;
