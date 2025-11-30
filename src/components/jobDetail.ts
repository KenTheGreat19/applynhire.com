// Job detail script

document.addEventListener('DOMContentLoaded', () => {
  const jobDetailBtn = document.getElementById('view-job-detail') as HTMLButtonElement | null;
  
  if (jobDetailBtn) {
    jobDetailBtn.addEventListener('click', (e: Event) => {
      e.preventDefault();
      alert('Job detail opening (placeholder)');
    });
  }
});
