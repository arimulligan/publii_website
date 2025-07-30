document.addEventListener('DOMContentLoaded', function () {
   const openButtons = document.querySelectorAll('.js-open-video');
   const modal = document.getElementById('video-modal');
   const videoFrame = document.getElementById('video-frame');
   const transcriptFrame = document.getElementById('transcript-frame');
   const title = document.getElementById('video-title');

   openButtons.forEach(button => {
      button.addEventListener('click', function (e) {
         e.preventDefault();
         const videoUrl = button.getAttribute('data-video');
         if (!videoUrl || videoUrl == "") {
            title.textContent = "Missing video link. Try again, or contact us if issue persists."
            videoFrame.style.display = "none";
         } else {
            const videoTitle = button.getAttribute('data-title');
            const transcript = button.getAttribute('data-transcript');
            if (!transcript || transcript == "") {
               transcriptFrame.style.display = "none";
            } else {
               transcriptFrame.src = transcript;
            }
            title.textContent = videoTitle;
            videoFrame.src = videoUrl.replace("watch?v=", "embed/") + "?autoplay=1";
         }
         modal.style.display = "flex";
      });
   });

   const closeButtons = [document.getElementById('video-close'), document.getElementById('video-close-btn')];
   closeButtons.forEach(el => {
      el.addEventListener('click', function () {
         videoFrame.src = "";
         modal.style.display = "none";
      });
   });
});