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
      <div style="visibility: hidden" class="product-description">
        <div class="description-label">
          <p class="comment-label">COMMENTS</p>
        </div>
        <div class="description-card">
          <div class="description-text">
            {{ certificate.CertificateComments }}
          </div>
        </div>
      </div>
      <div class="footer">
        <img src="../assets/images/DIS_Logo.png" class="ds-logo" />
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
  let certificateDoc = await getDoc(
    doc(db, route.params.certType, route.params.certId)
  );
  certificate.value = certificateDoc.data();
}

const templateComponent = computed(() =>
  defineAsyncComponent(
    () =>
      import(
        `../components/templates/${route.params.certType}/${certificate.value.Template.id}.vue`
      )
    // import(`../components/templates/9.vue`)
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
      const animatedPhaseOneElements = document.querySelectorAll(
        ".animated-phase-one"
      );
      const animatedPhaseTwoElements = document.querySelectorAll(
        ".animated-phase-two"
      );
      const animatedPhaseThreeElements = document.querySelectorAll(
        ".animated-phase-three"
      );
      const animatedPhaseFourElements = document.querySelectorAll(
        ".animated-phase-four"
      );
      const descriptionLabel = document.querySelector(".description-label");
      const productDesc = document.querySelector(".product-description");
      const primaryCont = document.querySelector(".primary-gem");
      const secondaryCont = document.querySelector(".secondary");
      introContainer.style.animation = "fadeOut 1s ease-in-out forwards";
      setTimeout(() => {
        mainContent.style.animation = "slideUpFade 0.5s ease-in forwards";
        introContainer.style.display = "none";
        templateContainer.classList.remove("hidden");

        setTimeout(() => {
          templateContainer.classList.add("visible");
          mainContent.classList.add("visible");
          specsSection.style.visibility = "visible";
          jewelryVideo.currentTime = 5;
          // specInfo.style.animation = "scaleUp 0.7s ease-in forwards";
          animatedPhaseOneElements.forEach((el) => {
            el.style.animation = "scaleUp 0.7s ease-in forwards";
          });
          setTimeout(() => {
            animatedPhaseTwoElements.forEach((el) => {
              el.style.animation = "scaleUp 0.7s ease-in forwards";
            });
            setTimeout(() => {
              animatedPhaseThreeElements.forEach((el) => {
                el.style.animation = "scaleUp 0.7s ease-in forwards";
              });
              setTimeout(() => {
                animatedPhaseFourElements.forEach((el) => {
                  el.style.animation = "scaleUp 0.7s ease-in forwards";
                });
                setTimeout(() => {
                  productDesc.style.visibility = "visible";
                  productDesc.style.animation = "scaleUp 0.7s ease-in forwards";

                  descriptionLabel.classList.remove("hidden");
                  descriptionLabel.style.animation =
                    "scaleUp 0.7s ease-in forwards";
                }, 300);
              }, 300);
            }, 300);
          }, 200);
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
