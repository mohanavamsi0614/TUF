import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function CalendarContainer({ children }: Props) {
  return (
    <div className="calendar-wrapper">
      {children}
    </div>
  );
}
