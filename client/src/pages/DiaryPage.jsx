import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DiaryPage.css';

function DiaryPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const addNote = async () => {
    if (!title || !content) return alert('Please enter both title and content.');
    try {
      await axios.post(
        'http://localhost:5000/notes',
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle('');
      setContent('');
      navigate('/notes'); // ✅ Go to notes after adding
    } catch (err) {
      console.error('Error adding note:', err);
      alert('Failed to add note. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const viewNotes = () => {
    navigate('/notes'); // ✅ View Notes button action
  };

  return (
    <div className="diary-container">
      <h1 className="diary-title">Dear Diary</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />

      <textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea-field"
      />

      <button onClick={addNote} className="add-button">
        Add Note
      </button>

      <button onClick={viewNotes} className="view-notes-button">
        📖 View Notes
      </button>

      <div className="logout-container">
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default DiaryPage;
