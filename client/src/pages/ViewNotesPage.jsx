import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './ViewNotesPage.css';

function ViewNotesPage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchNotes();
    }
    // eslint-disable-next-line
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="view-notes-container">
      <h1>📓 My Diary Notes</h1>

      <div className="top-buttons">
        <button onClick={() => navigate('/diary')} className="button diary-button">
          ➕ Add New Note
        </button>
        <button onClick={logout} className="button logout-button">
          Logout
        </button>
      </div>

      {notes.length === 0 ? (
        <p>No notes found. Start writing your thoughts!</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} className="note-card">
            <h3>
              <Link to={`/note/${note._id}`} style={{ textDecoration: 'none', color: '#333' }}>
                {note.title}
              </Link>
            </h3>
            <p>{new Date(note.createdAt).toLocaleString()}</p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => deleteNote(note._id)}
                className="delete-button"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/note/${note._id}`)}
                className="edit-button"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewNotesPage;
