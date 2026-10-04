import { useState, useEffect, useRef, useCallback } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [isDark, setIsDark] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Restore draft and theme from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('note-draft');
    if (savedDraft) {
      setText(savedDraft);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  // Apply dark class to body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  // Save draft whenever text changes
  useEffect(() => {
    localStorage.setItem('note-draft', text);
  }, [text]);

  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  const getCharCountClass = useCallback(() => {
    if (charCount > 200) return 'over';
    if (charCount > 180) return 'warning';
    return '';
  }, [charCount]);

  const handleClear = () => {
    setText('');
    localStorage.removeItem('note-draft');
  };

  const handleToggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <>
      <style>{`
        :root {
          --bg-color: #f5f5f5;
          --text-color: #333333;
          --textarea-bg: #ffffff;
          --textarea-border: #cccccc;
          --btn-bg: #4a90d9;
          --btn-text: #ffffff;
          --btn-hover: #357abd;
          --container-bg: #ffffff;
          --shadow: rgba(0, 0, 0, 0.1);
        }

        body.dark {
          --bg-color: #1a1a2e;
          --text-color: #e0e0e0;
          --textarea-bg: #16213e;
          --textarea-border: #0f3460;
          --btn-bg: #e94560;
          --btn-text: #ffffff;
          --btn-hover: #c73e54;
          --container-bg: #0f3460;
          --shadow: rgba(0, 0, 0, 0.3);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: var(--bg-color);
          color: var(--text-color);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .container {
          background-color: var(--container-bg);
          border-radius: 12px;
          padding: 30px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 4px 20px var(--shadow);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        h1 {
          margin-bottom: 20px;
          font-size: 1.8rem;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.95rem;
        }

        textarea {
          width: 100%;
          min-height: 200px;
          padding: 12px;
          border: 2px solid var(--textarea-border);
          border-radius: 8px;
          background-color: var(--textarea-bg);
          color: var(--text-color);
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }

        textarea:focus {
          outline: none;
          border-color: var(--btn-bg);
        }

        #char-count {
          margin-top: 12px;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }

        #word-count {
          margin-top: 4px;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .warning {
          color: orange;
        }

        .over {
          color: red;
          font-weight: bold;
        }

        .button-group {
          margin-top: 20px;
          display: flex;
          gap: 12px;
        }

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          background-color: var(--btn-bg);
          color: var(--btn-text);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }

        button:hover {
          background-color: var(--btn-hover);
        }

        button:active {
          transform: scale(0.97);
        }
      `}</style>
      <div className="container">
        <h1>Note Draft</h1>
        <label htmlFor="note-text">Write your note:</label>
        <textarea
          id="note-text"
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start typing your note here..."
        />
        <p id="char-count" className={getCharCountClass()}>
          {charCount} / 200 characters
        </p>
        <p id="word-count">{wordCount} words</p>
        <div className="button-group">
          <button id="clear-btn" onClick={handleClear}>
            Clear
          </button>
          <button id="theme-toggle" onClick={handleToggleTheme}>
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>
    </>
  );
}
