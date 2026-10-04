// Select all elements
const noteText = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');

// Update counts and warning classes
function updateCounts() {
  const text = noteText.value;
  const charLength = text.length;
  
  // Count words: split by whitespace, filter empty strings
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  
  // Update character count display
  charCount.textContent = `${charLength} / 200 characters`;
  
  // Update word count display
  wordCount.textContent = `${words} words`;
  
  // Remove both classes first
  charCount.classList.remove('warning', 'over');
  
  // Add appropriate class based on character count
  if (charLength > 200) {
    charCount.classList.add('over');
  } else if (charLength > 180) {
    charCount.classList.add('warning');
  }
}

// Save draft to localStorage
function saveDraft() {
  localStorage.setItem('note-draft', noteText.value);
}

// Clear everything
function clearAll() {
  noteText.value = '';
  updateCounts();
  localStorage.removeItem('note-draft');
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle('dark');
  
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Event listeners
noteText.addEventListener('input', () => {
  updateCounts();
  saveDraft();
});

clearBtn.addEventListener('click', clearAll);

themeToggle.addEventListener('click', toggleTheme);

// Escape key clears the textarea
noteText.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    clearAll();
  }
});

// On page load, restore draft and theme
document.addEventListener('DOMContentLoaded', () => {
  // Restore draft
  const savedDraft = localStorage.getItem('note-draft');
  if (savedDraft) {
    noteText.value = savedDraft;
  }
  
  // Restore theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = 'Light mode';
  }
  
  // Update counts with restored content
  updateCounts();
});
