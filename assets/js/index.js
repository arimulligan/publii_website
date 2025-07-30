document.addEventListener('DOMContentLoaded', function () {
   const openButtons = document.querySelectorAll('.js-open-video');
   const modal = document.getElementById('video-modal');
   const iframe = document.getElementById('video-frame');
   const title = document.getElementById('video-title');

   openButtons.forEach(button => {
      button.addEventListener('click', function (e) {
         e.preventDefault();
         const videoUrl = button.getAttribute('data-video');
         console.log(videoUrl)
         if (!videoUrl || videoUrl == "") {
            title.textContent = "Missing video link. Try again, or contact us if issue persists."
            return;
         }
         const videoTitle = button.getAttribute('data-title');
         title.textContent = videoTitle;
         iframe.src = videoUrl.replace("watch?v=", "embed/") + "?autoplay=1";
         modal.style.display = "flex";
      });
   });

   const closeButtons = [document.getElementById('video-close'), document.getElementById('video-close-btn')];
   closeButtons.forEach(el => {
      el.addEventListener('click', function () {
         iframe.src = "";
         modal.style.display = "none";
      });
   });
});