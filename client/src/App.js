import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiaryPage from './pages/DiaryPage';
import ViewNotesPage from './pages/ViewNotesPage'; // ✅ updated name
import NoteViewPage from './pages/NoteViewPage';
import PrivateRoute from './components/PrivateRoute';// ✅ keeps routes secure
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <BrowserRouter>

      {/* 🌙 Use the ThemeToggle component */}
      <ThemeToggle />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/diary"
          element={
            <PrivateRoute>
              <DiaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <ViewNotesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/note/:id"
          element={
            <PrivateRoute>
              <NoteViewPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
