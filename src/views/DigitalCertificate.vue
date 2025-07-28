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
  <div class="intro-container">
    <div class="logo-container">
      <video id="video" class="logo-video" muted playsinline>
        <source src="../assets/images/helzberg-logo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>

  <div v-if="certificate" class="main-content">
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

    <!-- <div class="custom-divider"></div> -->
    <!-- Bottom section with specifications -->
    <!-- Template Section -->
    <div class="specifications-section">
      <div class="product-id">
        <p class="product-id-main">
          DIS CERTIFICATE#: {{ certificate.CertNum }}
        </p>
        <p class="product-id-overlap">{{ certificate.ClientSKU }}</p>
      </div>
      <div class="template-container">
        <component :is="templateComponent" :certificate="certificate" />
      </div>
      <div class="product-description">
        <div class="description-label">COMMENTS</div>
        <div class="description-card">
          <div class="description-text">
            {{ certificate.CertificateComments }}
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
import { defineAsyncComponent, onMounted, ref, computed } from "vue";
import { db, getDoc, doc } from "../config/firebaseInit";
import { useRoute } from "vue-router";

const certificate = ref(null);

const route = useRoute();

async function fetchCertificate() {
  let certificateDoc = await getDoc(doc(db, "jewelry", route.params.certId));
  certificate.value = certificateDoc.data();
}

const templateComponent = computed(() =>
  defineAsyncComponent(
    () => import(`../components/templates/${certificate.value.Template.id}.vue`)
    // import(`../components/templates/7.vue`)
  )
);

onMounted(async () => {
  await fetchCertificate();
  // After 5 seconds, hide loader and show intro
  if (certificate.value) {
    const introContainer = document.querySelector(".intro-container");
    const loaderContainer = document.querySelector(".loader-container");
    const video = document.getElementById("video");

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
      const mainContent = document.querySelector(".main-content");
      const templateContainer = document.querySelector(".template-container");
      const specsSection = document.querySelector(".specifications-section");

      const jewelryVideo = document.getElementById("jewelry-video");
      const animatedPhase = document.querySelector(".animated-phase");
      const specInfo = document.querySelector(".specs-info");
      const productDesc = document.querySelector(".product-description");
      const primaryCont = document.querySelector(".primary-gem");
      const secondaryCont = document.querySelector(".secondary");
      introContainer.style.animation = "fadeOut 1s ease-in-out forwards";
      setTimeout(() => {
        mainContent.style.animation = "slideUpFade 0.5s ease-in forwards";
        introContainer.style.display = "none";
        templateContainer.classList.remove("hidden");

        setTimeout(() => {
          console.log(animatedPhase)
          templateContainer.classList.add("visible");
          mainContent.classList.add("visible");
          specsSection.style.visibility = "visible";
          jewelryVideo.currentTime = 5;
          // specInfo.style.animation = "scaleUp 0.7s ease-in forwards";
          animatedPhase.style.animation = "scaleUp 0.7s ease-in forwards";
          // productDesc.style.animation = "scaleUp 0.7s ease-in forwards";
          // primaryCont.style.animation = "scaleUp 0.7s ease-in forwards";
          // secondaryCont.style.animation = "scaleUp 0.7s ease-in forwards";
        }, 100);
      }, 500);
    }, 4500);
  }
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

<style></style>
