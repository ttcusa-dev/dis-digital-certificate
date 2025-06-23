<template>
  <!-- Loader container (shows first for 5 seconds) -->
  <div class="loader-container">
    <div class="loader-content">
      <img
        src="../assets/images/loader.gif"
        class="loader-gif"
        alt="Loading..."
      />
    </div>
  </div>

  <!-- Intro container (shows after loader) -->
  <div class="intro-container hidden">
    <div class="logo-container">
      <video id="video" class="logo-video" muted playsinline>
        <source src="../assets/images/helzberg-logo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>

  <div class="main-content hidden">
    <!-- Top section with jewelry showcase -->
    <div class="jewelry-showcase">
      <div class="showcase-header">
        <img
          class="client-logo"
          src="../assets/images/Helzberg_logo.png"
          alt=""
          srcset=""
        />
        <!-- <div class="showcase-logo">HELZBERG</div>
        <div class="showcase-year">1915</div> -->
      </div>
      <!-- Replace the div with video element -->
      <video
        id="jewelry-video"
        class="jewelry-image"
        autoplay
        loop
        muted
        playsinline
      >
        <source src="../assets/images/Emerlad.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="custom-divider"></div>
    <!-- Bottom section with specifications -->
    <div class="specifications-section">
      <div class="product-info">
        <div class="product-id">
          <p class="product-id-main">DIS CERTIFICATE#: 517818-HZ</p>
          <p class="product-id-overlap">PDOI9352E-WA</p>
        </div>

        <div class="specs-grid">
          <div class="spec-item">
            <div class="spec-value">PENDANT</div>
            <div class="spec-label">STYLE</div>
          </div>
          <div class="spec-item">
            <div class="spec-value">14KWG</div>
            <div class="spec-label">METAL</div>
          </div>
        </div>
      </div>

      <div class="primary-gem">
        <div class="spec-label">PRIMARY:GEM STONE</div>
        <div class="gem-content-layout">
          <div class="specs-container">
            <div class="size-info">
              <div class="specs-value">13.30X8.40MM</div>
              <div class="specs-label">GEM SIZE</div>
            </div>
            <div
              class="gem-center"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <img
                src="../assets/images/emerlad.svg"
                class="gem-image"
                alt="Emerald"
              />
              <div class="gem-type">
                <div>EMERALD</div>
                <div class="round">(PEAR)</div>
              </div>
            </div>

            <div class="specs-info">
              <div class="specs-divs">
                <div class="specs-value"></div>
                <div class="specs-label"></div>
              </div>
              <div class="specs-divs">
                <div class="specs-value"></div>
                <div class="specs-label"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="primary-gem">
        <div class="spec-label">SECONDARY DIAMOND(S)</div>

        <div class="diamond-section">
          <div class="specs-container">
            <div class="clarity-info">
              <div class="specs-value">VS1-VS2</div>
              <div class="specs-label">CLARITY</div>
            </div>

            <div
              class="diamond-visual"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <img
                src="../assets/images/labground.svg"
                class="gem-image"
                alt="Diamond"
              />
              <div class="gem-type" style="width: fit-content">
                <div style="width: 203px; font-size: 12px">
                  LAB GROWN DIAMOND
                </div>
                <div style="width: 200px; font-size: 12px" class="round">
                  (ROUND)
                </div>
              </div>
            </div>

            <div class="specs-info">
              <div class="specs-divs">
                <div class="specs-value">E-F</div>
                <div class="specs-label">COLOR</div>
              </div>
              <div class="specs-divs">
                <div class="specs-value">0.61</div>
                <div class="specs-label">WEIGHT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="product-description">
        <div class="description-label">COMMENTS</div>
        <div class="description-card">
          <div class="description-text">
            Diamond & Emerald Pendant with 1 lab created emerald pear-shaped and
            33 round lab grown diamonds weighing approximately 0.61 ct.tw.in14k
            White Gold. Weight estimated. Graded as mounting permits.
          </div>
        </div>
      </div>

      <div class="footer">
        <img src="../assets/images/DIS-Logo 1.svg" class="ds-logo" />
        <div class="website">DIAMONDSERVICESUSA.COM</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const loaderContainer = document.querySelector(".loader-container");
  const introContainer = document.querySelector(".intro-container");
  const mainContent = document.querySelector(".main-content");
  const specsSection = document.querySelector(".specifications-section");
  const video = document.getElementById("video");
  const jewelryVideo = document.getElementById("jewelry-video");

  // After 5 seconds, hide loader and show intro video
  setTimeout(() => {
    loaderContainer.style.animation = "fadeOut 0.5s ease-in-out forwards";
    setTimeout(() => {
      loaderContainer.style.display = "none";
      introContainer.classList.remove("hidden");
      video.currentTime = 0; // Set the video to start from the beginning
      video.play();
    }, 500);
  }, 1000);

  // After 8 seconds total (5s loader + 3s intro), show main content
  setTimeout(() => {
    introContainer.style.animation = "fadeOut 1s ease-in-out forwards";
    setTimeout(() => {
      introContainer.style.display = "none";
      mainContent.classList.remove("hidden");
      setTimeout(() => {
        mainContent.classList.add("visible");
        specsSection.style.visibility = "visible";
        jewelryVideo.currentTime = 5;
      }, 100);
    }, 500);
  }, 4500);
});
// document.addEventListener("DOMContentLoaded", () => {
//   const loaderContainer = document.querySelector(".loader-container");
//   const introContainer = document.querySelector(".intro-container");
//   const mainContent = document.querySelector(".main-content");
//   const specsSection = document.querySelector(".specifications-section");
//   const video = document.getElementById("video");

//   // After 5 seconds, hide loader and show intro video
//   setTimeout(() => {
//     loaderContainer.style.animation = "fadeOut 0.5s ease-in-out forwards";
//     setTimeout(() => {
//       loaderContainer.style.display = "none";
//       introContainer.classList.remove("hidden");
//       video.currentTime = 0; // Set the video to start from the beginning
//       video.play();
//     }, 500);
//   }, 1000);

//   // After 8 seconds total (5s loader + 3s intro), show main content
//   setTimeout(() => {
//     introContainer.style.animation = "fadeOut 1s ease-in-out forwards";
//     setTimeout(() => {
//       introContainer.style.display = "none";
//       mainContent.classList.remove("hidden");
//       setTimeout(() => {
//         mainContent.classList.add("visible");
//         specsSection.style.visibility = "visible";
//       }, 100);
//     }, 500);
//   }, 4500);
// });
</script>

<style>
</style>