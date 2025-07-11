import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // ✅ fetchNotes wrapped in useCallback to avoid ESLint warning
  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/notes', {
        headers: { Authorization: token },
      });
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      alert('Session expired or unauthorized. Please login again.');
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [token, navigate]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        headers: { Authorization: token },
      });
      fetchNotes(); // refresh after delete
    } catch (err) {
      console.error(err);
      alert('Failed to delete note.');
    }
  };

  const startEditing = (note) => {
    setEditNoteId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const updateNote = async () => {
    try {
      await axios.put(
        `http://localhost:5000/notes/${editNoteId}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: { Authorization: token },
        }
      );
      setEditNoteId(null);
      setEditTitle('');
      setEditContent('');
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert('Failed to update note.');
    }
  };

  // ✅ Safe useEffect with fetchNotes in dependency array
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>📓 My Diary Notes</h1>

      {/* Logout Button */}
      {token && (
        <button
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            float: 'right',
            marginTop: '-50px',
          }}
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          Logout
        </button>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <p>No notes found. Go back and add some!</p>
      ) : (
        notes.map((note) =>
          editNoteId === note._id ? (
            <div
              key={note._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px 0',
                backgroundColor: '#fff9c4',
              }}
            >
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                style={{ width: '100%', marginBottom: '5px' }}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Content"
                style={{ width: '100%', height: '80px' }}
              />
              <br />
              <button onClick={updateNote} style={{ marginRight: '10px' }}>
                Save
              </button>
              <button onClick={() => setEditNoteId(null)}>Cancel</button>
            </div>
          ) : (
            <div
              key={note._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px 0',
                backgroundColor: '#e3f2fd',
              }}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>{new Date(note.createdAt).toLocaleString()}</small>
              <br />
              <button onClick={() => startEditing(note)} style={{ marginRight: '10px' }}>
                Edit
              </button>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          )
        )
      )}
    </div>
  );
}

export default NotesPage;
