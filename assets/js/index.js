let showTranscriptBool = true;

document.addEventListener('DOMContentLoaded', function () {
   const openButtons = document.querySelectorAll('.js-open-video');
   const modal = document.getElementById('video-modal');
   const videoFrame = document.getElementById('video-frame');
   const transcriptFrame = document.getElementById('transcript-frame');
   const title = document.getElementById('video-title');

   const hideTranscriptButton = document.getElementById('transcript-showhide');
   const exploreVids = document.getElementById('explore-vids-button');

   if (modal === null) return;

   if (openButtons.length !== 0) {
      openButtons.forEach(button => {
         button.addEventListener('click', function (e) {
            e.preventDefault();
            const videoUrl = button.getAttribute('data-video');

            if (!videoUrl || videoUrl == "") {
               title.textContent = "Missing video link. Try again, or contact us if issue persists."
               videoFrame.style.display = "none";
            } else {

               const videoTitle = button.getAttribute('data-title');
               title.textContent = videoTitle;
               videoFrame.src = videoUrl.replace("watch?v=", "embed/") + "?autoplay=1";
               
               const transcript = button.getAttribute('data-transcript');
               if (!transcript || transcript == "") {
                  transcriptFrame.style.display = "none";
                  transcriptFrame.textContent = "Show Transcript";
                  videoFrame.style.width = "100%";
               } else {
                  transcriptFrame.src = transcript;
                  hideTranscriptButton.disabled = false;
                  transcriptVisibility();
                  hideTranscriptButton.addEventListener('click', function (e) {
                     showTranscriptBool = !showTranscriptBool;
                     transcriptVisibility();
                  });
               }
               
            }
            modal.style.display = "flex";
         });
      });
   }

   function transcriptVisibility() {
      if (showTranscriptBool) {
         transcriptFrame.style.display = "flex";
         transcriptFrame.textContent = "Hide Transcript";
         videoFrame.style.width = "70%";
      } else {
         transcriptFrame.style.display = "none";
         transcriptFrame.textContent = "Show Transcript";
         videoFrame.style.width = "100%";
      }
   }

   const closeButtons = [document.getElementById('video-close'), document.getElementById('video-close-btn')];
   if (closeButtons.length !== 0) {
      closeButtons.forEach(el => {
         el.addEventListener('click', function () {
            videoFrame.src = "";
            transcriptFrame.src = "";
            modal.style.display = "none";
         });
      });
   }
});