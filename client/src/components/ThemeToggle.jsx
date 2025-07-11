import React, { useEffect, useState } from 'react';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

export default ThemeToggle;
