import { useState } from 'react';
import { PlusCircle, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { NotesRecord, Note } from '../App';

interface Props {
  selectedDate: Date | null;
  notesRecord: NotesRecord;
  onAddNote: (dateKey: string, note: Note) => void;
  onDeleteNote: (dateKey: string, noteId: string) => void;
}

const COLORS = ['#ea4335', '#4285f4', '#fbbc05', '#34a853', '#9c27b0', '#00bcd4'];

export default function NotesSection({ selectedDate, notesRecord, onAddNote, onDeleteNote }: Props) {
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  if (!selectedDate) return <div className="notes-container empty">Select a date to add notes</div>;

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const dayNotes = notesRecord[dateKey] || [];

  const handleAdd = () => {
    if (!newNoteText.trim()) return;
    onAddNote(dateKey, {
      id: Math.random().toString(36).substring(2, 9),
      text: newNoteText.trim(),
      color: selectedColor
    });
    setNewNoteText('');
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <CalendarIcon size={18} />
        <span>Events for {format(selectedDate, 'MMM d, yyyy')}</span>
      </div>
      
      <div className="notes-list">
        {dayNotes.map(note => (
          <div key={note.id} className="note-item" style={{ borderLeftColor: note.color }}>
            <span className="note-text">{note.text}</span>
            <button className="note-delete" onClick={() => onDeleteNote(dateKey, note.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {dayNotes.length === 0 && <div className="no-notes">No events for this day.</div>}
      </div>

      <div className="add-note-form">
        <div className="color-picker">
          {COLORS.map(c => (
            <button
              key={c}
              className={`color-btn ${selectedColor === c ? 'active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>
        <div className="add-note-input-row">
          <input 
            type="text" 
            className="note-input"
            placeholder="Add an event..."
            value={newNoteText}
            onChange={e => setNewNoteText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <button className="add-note-btn" onClick={handleAdd}>
            <PlusCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
