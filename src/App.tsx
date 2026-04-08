import { useState, useEffect } from 'react';
import CalendarContainer from './components/CalendarContainer';
import HeroPanel from './components/HeroPanel';
import MonthGrid from './components/MonthGrid';
import NotesSection from './components/NotesSection';
import { addMonths, subMonths } from 'date-fns';

export interface Note {
  id: string;
  text: string;
  color: string;
}

export type NotesRecord = Record<string, Note[]>;

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [notes, setNotes] = useState<NotesRecord>(() => {
    try {
      const saved = localStorage.getItem('calendar_events');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('calendar_events', JSON.stringify(notes));
  }, [notes]);

  const handleMonthChange = (direction: 'next' | 'prev') => {
    setCurrentDate(prev => 
      direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate) || date < startDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  const handleAddNote = (dateKey: string, note: Note) => {
    setNotes(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), note]
    }));
  };

  const handleDeleteNote = (dateKey: string, noteId: string) => {
    setNotes(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(n => n.id !== noteId)
    }));
  };

  return (
    <CalendarContainer>
      <HeroPanel currentDate={currentDate} />
      <div className="calendar-main-content">
        <MonthGrid 
          currentDate={currentDate}
          startDate={startDate}
          endDate={endDate}
          notes={notes}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
        />
        <NotesSection 
          selectedDate={startDate} 
          notesRecord={notes}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>
    </CalendarContainer>
  );
}

export default App;
