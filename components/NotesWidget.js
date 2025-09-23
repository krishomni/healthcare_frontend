import { useState, useEffect } from 'react'
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa'

export default function NotesWidget({ onClose }) {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    const savedNotes = localStorage.getItem('healthcareNotes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes)
    localStorage.setItem('healthcareNotes', JSON.stringify(updatedNotes))
  }

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        text: newNote,
        timestamp: new Date().toLocaleString()
      }
      const updatedNotes = [...notes, note]
      saveNotes(updatedNotes)
      setNewNote('')
    }
  }

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    saveNotes(updatedNotes)
  }

  return (
    <div className="fixed top-24 right-16 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-hidden">
      <div className="bg-yellow-500 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">Quick Notes</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <FaTimes />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
            placeholder="Add a quick note..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={addNote}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-colors"
          >
            <FaPlus />
          </button>
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-800 flex-1">{note.text}</p>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700 ml-2 transition-colors"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">{note.timestamp}</p>
            </div>
          ))}
          {notes.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No notes yet. Add your first note above!</p>
          )}
        </div>
      </div>
    </div>
  )
}