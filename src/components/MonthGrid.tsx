import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday,
  isWithinInterval
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NotesRecord } from '../App';

interface Props {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  notes: NotesRecord;
  onDateSelect: (date: Date) => void;
  onMonthChange: (direction: 'next' | 'prev') => void;
}

export default function MonthGrid({ currentDate, startDate, endDate, notes, onDateSelect, onMonthChange }: Props) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDateGrid = startOfWeek(monthStart);
  const endDateGrid = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = eachDayOfInterval({
    start: startDateGrid,
    end: endDateGrid
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="month-grid-container">
      <div className="month-header">
        <button className="month-nav-btn" onClick={() => onMonthChange('prev')}>
          <ChevronLeft size={20} />
        </button>
        <span className="month-current-label">{format(currentDate, 'MMMM yyyy')}</span>
        <button className="month-nav-btn" onClick={() => onMonthChange('next')}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="days-grid">
        {weekDays.map(day => (
          <div className="day-label" key={day}>{day}</div>
        ))}

        {days.map(day => {
          const isSelectedStart = startDate && isSameDay(day, startDate);
          const isSelectedEnd = endDate && isSameDay(day, endDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isCurrentToday = isToday(day);
          const dayKey = format(day, 'yyyy-MM-dd');
          const dayNotes = notes[dayKey] || [];
          
          let isInRange = false;
          if (startDate && endDate) {
             isInRange = isWithinInterval(day, { start: startDate, end: endDate });
          }

          let classNames = 'day-cell';
          if (!isCurrentMonth) classNames += ' empty';
          else {
            if (isSelectedStart || isSelectedEnd) classNames += ' selected';
            else if (isInRange) classNames += ' in-range';
            if (isCurrentToday) classNames += ' today';
          }

          return (
            <div 
              key={day.toString()} 
              className={classNames}
              onClick={() => isCurrentMonth && onDateSelect(day)}
            >
              <div className="day-number">{isCurrentMonth ? format(day, dateFormat) : ''}</div>
              {isCurrentMonth && dayNotes.length > 0 && (
                <div className="day-dots">
                  {dayNotes.slice(0, 3).map((note) => (
                    <span 
                      key={note.id} 
                      className="note-dot" 
                      style={{ backgroundColor: note.color }}
                    />
                  ))}
                  {dayNotes.length > 3 && <span className="note-dot-more">+</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
