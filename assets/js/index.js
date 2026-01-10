document.addEventListener('DOMContentLoaded', function () {
   const modal = document.getElementById('video-modal');
   if (!modal) return;

   const videoFrame = document.getElementById('video-frame');
   const transcriptFrame = document.getElementById('transcript-frame');
   const title = document.getElementById('video-title');

   const prevBtn = document.getElementById('modal-prev');
   const nextBtn = document.getElementById('modal-next');

   const openButtons = Array.from(document.querySelectorAll('.js-open-video'));

   // Build an in-memory list of posts
   const posts = openButtons.map(btn => ({
      video: btn.getAttribute('data-video'),
      transcript: btn.getAttribute('data-transcript'),
      title: btn.getAttribute('data-title')
   }));

   let currentIndex = -1;

   function openModal(index) {
      const post = posts[index];
      if (!post) return;

      currentIndex = index;

      title.textContent = post.title || '';

      if (post.video) {
         videoFrame.style.display = 'block';
         videoFrame.src = post.video.replace('watch?v=', 'embed/') + '?autoplay=1';
      } else {
         videoFrame.style.display = 'none';
      }

      if (post.transcript) {
         transcriptFrame.style.display = 'block';
         transcriptFrame.src = post.transcript;
      } else {
         transcriptFrame.style.display = 'none';
      }

      // Disable buttons at edges
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === posts.length - 1;

      modal.style.display = 'flex';
   }

   // Card click
   openButtons.forEach(btn => {
      btn.addEventListener('click', e => {
         e.preventDefault();
         const index = Number(btn.getAttribute('data-index'));
         openModal(index);
      });
   });

   // Prev / Next
   prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
         openModal(currentIndex - 1);
      }
   });

   nextBtn.addEventListener('click', () => {
      if (currentIndex < posts.length - 1) {
         openModal(currentIndex + 1);
      }
   });

   // Close modal
   const closeButtons = [
      document.getElementById('video-close'),
      document.getElementById('video-close-btn')
   ];

   closeButtons.forEach(el => {
      if (!el) return;
      el.addEventListener('click', () => {
         videoFrame.src = '';
         transcriptFrame.src = '';
         modal.style.display = 'none';
         currentIndex = -1;
      });
   });
});
