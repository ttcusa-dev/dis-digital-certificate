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

  <div v-if="certificate" v-show="!showFullPageAd" class="main-content">
    <!-- Top section with jewelry showcase -->
    <div class="jewelry-showcase">
      <div class="showcase-header">
        <img class="client-logo" :src="client.images.url" alt="" srcset="" />
      </div>
      <!-- Replace the div with video element -->
      <video
        id="jewelry-video"
        class="jewelry-image"
        autoplay
        muted
        playsinline
        ref="productVideo"
        @timeupdate="handleTime"
        @ended="handleVideoPlayback"
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
      <Footer />
    </div>
  </div>

  <div class="advertisements">
    <AdPage
      v-if="activateAds"
      :currentCampaign="currentCampaign"
      :showFullPageAd="showFullPageAd"
      :showFooterAd="showFooterAd"
      @handleAdToggle="handleAdToggle"
      @handle-analytics="handleAnalytics('click', true)"
    />
  </div>

  <!-- <div class="nocontent" v-if="noCertificate && !DISLoading">
    <p>
      We were unable to locate this certificate. It may not exist or has not
      been generated yet. Please try again later. If the issue persists or you
      are experiencing difficulties with the video, please contact Diamond
      Services for assistance.
    </p>

    <p>Redirecting you back to the home page in ...{{ redirectTimer }}</p>
  </div> -->
</template>

<script setup>
import {
  defineAsyncComponent,
  onMounted,
  ref,
  computed,
  useTemplateRef,
  watch,
} from "vue";
import {
  db,
  getDoc,
  doc,
  getDocs,
  where,
  orderBy,
  endAt,
  query,
  collection,
} from "../config/firebaseInit";
import { useRoute } from "vue-router";
import Footer from "../components/Footer.vue";
import AdPage from "../components/AdPage.vue";
import { DateTime } from "luxon";
import axios from "axios";

const certificate = ref(null);
const client = ref(null);
const campaings = ref([]);
const currentCampaign = ref({});
const showFooterAd = ref(false);
const showFullPageAd = ref(false);
const activateAds = ref(false);
const has_footer_ad = ref(false);
const noAdsInit = ref(false);

const route = useRoute();

async function fetchCertificate() {
  let certificateDoc = await getDoc(
    doc(db, route.params.certType, route.params.certId)
  );
  certificate.value = certificateDoc.data();
}

async function fetchCertClient(clientId) {
  let clientDoc = await getDoc(doc(db, "companies", clientId));
  client.value = clientDoc.data();
}

//For Advertisement
async function fetchClientCampaign(clientId) {
  const timestamp = DateTime.now().toMillis();
  const campaignRef = collection(db, "companies", clientId, "campaigns");
  const campaignQuery = query(
    campaignRef,
    where("active", "==", true),
    orderBy("start_at", "asc"),
    endAt(timestamp)
  );
  const campaignDoc = await getDocs(campaignQuery);

  if (!campaignDoc.empty) {
    campaings.value = campaignDoc.docs
      .map((d) => Object.assign({ id: d.id }, d.data()))
      .filter((d) => {
        if (d.use_for_all) {
          return true;
        } else if (
          certificate.value.hasOwnProperty("Customer") &&
          d.fetch_by_customer &&
          d.fetch_by_customer.selected
        ) {
          if (d.exclude_sku.selected) {
            return (
              !d.exclude_sku.items.includes(certificate.value.OrderNum) ||
              !d.exclude_sku.items.includes(certificate.value.CertNum) ||
              !d.exclude_sku.items.includes(certificate.value.ClientSKU)
            );
          }
          return (
            certificate.value.Customer.toUpperCase() ===
            d.fetch_by_customer.value
          );
        } else if (d.include_sku.selected) {
          return (
            d.include_sku.items.includes(certificate.value.OrderNum) ||
            d.include_sku.items.includes(certificate.value.CertNum) ||
            d.include_sku.items.includes(certificate.value.ClientSKU)
          );
        } else if (d.exclude_sku.selected) {
          return (
            !d.exclude_sku.items.includes(certificate.value.OrderNum) ||
            !d.exclude_sku.items.includes(certificate.value.CertNum) ||
            !d.exclude_sku.items.includes(certificate.value.ClientSKU)
          );
        } else {
          return false;
        }
      });

    if (campaings.value.length) {
      const randomCampaign = Math.floor(Math.random() * campaings.value.length);
      currentCampaign.value = campaings.value[randomCampaign];

      setTimeout(() => {
        activateAds.value = Boolean(campaings.value.length);
        setTimeout(() => {
          showFooterAd.value = Boolean(currentCampaign.value.footer_ad.url);
          if (currentCampaign.value.footer_ad.url) has_footer_ad.value = true;
        }, 500);
      }, 5000);
    } else {
      noAdsInit.value = true;
    }
  } else {
    noAdsInit.value = true;
  }
}

function handleTime(e) {
  if (!noAdsInit) {
    if (e.target.currentTime > timerTickerBeforeAd.values) {
      handleVideoPlayback();
    }
  }
}

function handleVideoPlayback() {
  if (campaings.value.length) {
    showFullPageAd.value = true;
    showFooterAd.value = false;
  } else {
    const el = useTemplateRef("productVideo");
    el.play();
  }
}

function handleAdToggle(data) {
  for (const key in data) {
    if (key == "showFullPageAd") {
      showFullPageAd.value = data[key];
    }
    if (key == "showFooterAd") {
      showFooterAd.value = data[key];
    }
  }
}

function initCertificateViewingSequence() {
  const loaderContainer = document.querySelector(".loader-container");
  const introContainer = document.querySelector(".intro-container");
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
      }, 100);
    }, 500);
  }, 4500);
}

function restartCertificateViewingSequence() {
  const mainContent = document.querySelector(".main-content");
  const introContainer = document.querySelector(".intro-container");
  // const templateContainer = document.querySelector(".template-container");

  // templateContainer.classList.add("hidden");

  introContainer.classList.remove("visible");
  mainContent.classList.remove("visible");

  introContainer.classList.add("hidden");
  mainContent.classList.add("hidden");

  introContainer.style.display = "none";
  mainContent.style.display = "none";
  const video = document.getElementById("jewelry-video");
  video.currentTime = 0; // Set the video to start from the beginning
  video.play();
  handleVideoPlayback()
  initCertificateViewingSequence();
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
    await fetchCertClient(certificate.value.Company.id);
    // await fetchClientCampaign(certificate.value.Company.id);
    initCertificateViewingSequence();

    // setTimeout(async () => {
    //   await this.fetchClientCampaign(certificate.value.Company.id);
    //   this.initAnalytics = await this.handleAnalyticsInitilization(
    //     this.digitalCertificate
    //   );
    // }, 1000);
  } else {
  }
});

watch(showFullPageAd, (toggled) => {
  if (!toggled) {
    restartCertificateViewingSequence();
  }
});
</script>


