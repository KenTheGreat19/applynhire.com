/* Job detail script */
document.addEventListener('DOMContentLoaded', () => {
    const jobDetailBtn = document.getElementById('view-job-detail');
    if (jobDetailBtn) {
        jobDetailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Job detail opening (placeholder)');
        });
    }
});
