import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './NoteView.css';

function NoteViewPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNote(res.data);
        setEditedTitle(res.data.title);
        setEditedContent(res.data.content);
      } catch (err) {
        alert("Note not found or you're not authorized.");
        navigate('/notes');
      }
    };

    fetchNote();
  }, [id, navigate, token]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/notes/${id}`,
        { title: editedTitle, content: editedContent },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setNote(res.data);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update note');
      console.error(err);
    }
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div className="note-view-container">
      <div className="note-box">
        <div className="top-buttons">
          <button className="back-button" onClick={() => navigate('/notes')}>← Back</button>
          {!isEditing && (
            <button className="edit-button" onClick={() => setIsEditing(true)}>✏️ Edit</button>
          )}
        </div>

        {isEditing ? (
          <>
            <input
              type="text"
              className="input-field"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="textarea-field"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button className="save-button" onClick={handleUpdate}>
              ✅ Save Changes
            </button>
          </>
        ) : (
          <>
            <h1 className="note-title">{note.title}</h1>
            <p className="note-date">{new Date(note.createdAt).toLocaleString()}</p>
            <div className="note-content">{note.content}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default NoteViewPage;
