(() => {
  const theme = document.getElementById('theme');
  const setTheme = (value) => {
    document.documentElement.dataset.theme = value;
    theme.textContent = value === 'dark' ? 'Light mode ◑' : 'Dark mode ◐';
    theme.setAttribute('aria-label', value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };
  try { setTheme(localStorage.getItem('theme') || 'light'); } catch { setTheme('light'); }
  theme.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* Storage may be disabled. */ }
  });
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      let count = 0;
      document.querySelectorAll('.publication').forEach(paper => {
        paper.hidden = button.dataset.filter !== 'all' && paper.dataset.category !== button.dataset.filter;
        if (!paper.hidden) count++;
      });
      document.getElementById('filter-status').textContent = `${count} publications shown.`;
    });
  });
})();
