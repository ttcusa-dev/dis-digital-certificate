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

  <div v-if="stolenItem" class="stolen-message">
    THIS ITEM HAS BEEN REPORTED STOLEN BELONGS TO TTC USA. PLEASE CONTACT OWNER
    TAL WHARSHAVSKY 213-400-6610
  </div>

  <div class="nocontent" v-if="!loading && certificateDoesNotExist">
    <p>
      We were unable to locate this certificate. It may not exist or has not
      been generated yet. Please try again later. If the issue persists or you
      are experiencing difficulties with the video, please contact Diamond
      Services for assistance.
    </p>

    <p>Redirecting you back to the home page in ...{{ redirectTimer }}</p>
  </div>

  <div v-else class="digitalcert-wrapper">
    <!-- Intro container (shows after loader) -->
    <div
      v-if="!olderCertificate"
      :class="{
        has_footer_ad: has_footer_ad,
      }"
    >
      <div class="intro-container">
        <div class="logo-container">
          <video
            v-if="introVideo"
            id="video"
            class="logo-video"
            muted
            playsinline
          >
            <source :src="introVideo" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div
        v-if="certificate && !certificateDoesNotExist"
        v-show="!showFullPageAd"
        class="main-content"
      >
        <!-- Top section with jewelry showcase -->
        <div class="jewelry-showcase">
          <div
            id="client-logo"
            class="showcase-header"
            :class="{ has_footer: has_footer_ad }"
          >
            <img
              v-if="clientLogo"
              class="client-logo"
              :src="clientLogo"
              alt=""
              srcset=""
            />
          </div>
          <!-- Replace the div with video element -->

          <div v-if="noProductShowcasingVideo" class="no-video-message">
            NO VIDEO
          </div>
          <video
            v-if="productShowCaseVideo"
            id="jewelry-video"
            class="jewelry-image"
            autoplay
            muted
            playsinline
            ref="productVideo"
            @timeupdate="handleTime"
            @ended="handleVideoPlayback"
          >
            <source :src="productShowCaseVideo" type="video/mp4" />
            <!-- <source src="../assets/images/Emerlad.mp4" type="video/mp4" /> -->
            Your browser does not support the video tag.
          </video>

          <div v-if="certificate.Inscription" class="inscription">
            {{ certificate.Inscription }}
          </div>
        </div>

        <!-- <div class="custom-divider"></div> -->
        <!-- Bottom section with specifications -->
        <!-- Template Section -->
        <div class="specifications-section">
          <div class="template-container">
            <div class="product-id">
              <p class="product-id-main">
                <strong>
                  DIS CERTIFICATE#:
                  {{
                    certificate && certificate.ManufacturedAs === "Lab Grown"
                      ? `LG${certificate.CertNum}`
                      : certificate.CertNum
                  }}</strong
                >
              </p>
              <p class="product-id-overlap">{{ certificate.ClientSKU }}</p>
            </div>
            <component
              @view-imperfections="initImperfectionModal"
              :is="templateComponent"
              :certificate="certificate"
              :hasImperfection="has_imperfections"
            />
          </div>
          <div>
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
      </div>
    </div>

    <div v-else>
      <div
        v-if="!showFullPageAd"
        class="right"
        :class="{
          has_footer_ad: has_footer_ad,
        }"
      >
        <div v-if="certificate.Inscription" class="inscription">
          {{ certificate.Inscription }}
        </div>
        <div
          v-if="showCertNumberForOldCerts"
          class="certificate-number-wrapper"
          :class="{
            hz_theme: certificate.Company.name.includes('Helzberg'),
            isTemplate4: isTemplate4,

            has_imperfections: has_imperfections,
          }"
        >
          <strong>
            DIS CERTIFICATE#:
            {{
              certificate && certificate.ManufacturedAs === "Lab Grown"
                ? `LG${certificate.CertNum}`
                : certificate.CertNum
            }}</strong
          >
        </div>
        <video
          ref="productVideo"
          class="digital-cert-vid"
          :src="digitalCertificateVideoURL"
          autoplay
          muted
          playsinline
          @timeupdate="handleTime"
          @ended="handleVideoPlayback"
        ></video>
      </div>
    </div>

    <modal @close-modal="closeModal" :isVisible="showModal" :logo="clientLogo">
      <imperfections
        v-if="showImperfectionModal"
        :hasPerfections="has_imperfections"
        :imperfection="imperfections"
      ></imperfections>
    </modal>
  </div>

  <div class="advertisements">
    <AdPage
      v-if="activateAds"
      :currentCampaign="currentCampaign"
      :showFullPageAd="showFullPageAd"
      :showFooterAd="showFooterAd"
      :certificate="certificate"
      @handleAdToggle="handleAdToggle"
    />
  </div>
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

import { useRoute } from "vue-router";
import Footer from "../components/Footer.vue";
import AdPage from "../components/AdPage.vue";
import Imperfections from "../components/Imperfections.vue";
import Modal from "../components/Modal.vue";
import { DateTime } from "luxon";

// ──────────────────────────────────────────────
// Cloud Functions base URL
// ──────────────────────────────────────────────
const BASE_URL =
  "https://us-central1-diamonds-8cf72.cloudfunctions.net/digitalCertificateApi";

// tiny GET helper for all APIs
async function httpGet(path, params = {}, timeoutMs = 15000) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).length) qs.set(k, String(v));
  });
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE_URL}-${path}?${qs.toString()}`, {
      method: "GET",
      signal: ac.signal,
    });
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

// ──────────────────────────────────────────────
const route = useRoute();
const productVideoRef = useTemplateRef("productVideo");

// State (unchanged)
const certificate = ref(null);
const clientLogo = ref(null);
const campaings = ref([]);
const currentCampaign = ref({});
const imperfections = ref(null);
const introVideo = ref(null);
const productShowCaseVideo = ref(null);
const digitalCertificateVideoURL = ref(null);
const redirectTimer = ref(6);
const timerTickerBeforeAd = ref(20);
const enterTimestamp = ref(Date.now());

const noProductShowcasingVideo = ref(false);
const showModal = ref(false);
const showImperfectionModal = ref(false);
const showFooterAd = ref(false);
const showFullPageAd = ref(false);
const activateAds = ref(false);
const has_imperfections = ref(false);
const has_footer_ad = ref(false);
const isTemplate4 = ref(false);
const stolenItem = ref(false);
const showCertNumberForOldCerts = ref(false);
const noAdsInit = ref(false);
const olderCertificate = ref(false);
const certificateDoesNotExist = ref(false);
const initAnalytics = ref(false);
const loading = ref(false);

// ──────────────────────────────────────────────
// API wrappers
// ──────────────────────────────────────────────

async function apiFetchCertificate({ certType, certId }) {
  const data = await httpGet("fetchCertificate", { certType, certId });
  if (data?.ok && data.found) return data.data;
  return false;
}

async function apiFetchDigitalCertificateVideo(cert) {
  const { ClientSKU, CertNum, LineNum, OrderNum } = cert || {};
  const data = await httpGet("fetchDigitalCertificateVideo", {
    ClientSKU,
    CertNum,
    OrderNum,
    LineNum,
    certificateVideoUrl: cert?.CertificateVideo?.url,
  });

  if (data?.ok) {
    digitalCertificateVideoURL.value = data.digitalCertificateVideoURL || null;
    olderCertificate.value = !!data.olderCertificate;
    certificateDoesNotExist.value = !!data.certificateDoesNotExist;
  } else {
    if (cert?.CertificateVideo?.url) {
      digitalCertificateVideoURL.value = cert.CertificateVideo.url;
      olderCertificate.value = true;
    } else {
      certificateDoesNotExist.value = true;
    }
  }
}

async function apiFetchShowCasingVideo(videoFileName) {
  const data = await httpGet("fetchShowCasingVideo", { videoFileName });
  productShowCaseVideo.value = data?.url || null;
  noProductShowcasingVideo.value = !!data?.noProductShowcasingVideo;
}

async function apiFetchClientLogo(cert) {
  const data = await httpGet("fetchClientLogo", {
    companyId: cert?.Company?.id,
    customerLogo: cert?.CustomerLogo,
  });
  clientLogo.value = data?.logo || null;
}

async function apiFetchImperfections(id) {
  const data = await httpGet("fetchImperfections", { id });
  if (data?.ok && data.found) return data.imperfection;
  return false;
}

async function apiFetchClientCampaign(clientId, certCtx) {
  const payload = {
    clientId,
    OrderNum: certCtx?.OrderNum,
    CertNum: certCtx?.CertNum,
    ClientSKU: certCtx?.ClientSKU,
    Customer: certCtx?.Customer,
  };
  const data = await httpGet("fetchClientCampaign", payload);

  if (data?.ok) {
    campaings.value = data.campaigns || [];
    if (data.currentCampaign) currentCampaign.value = data.currentCampaign;

    // keep your reveal timing on client
    if (campaings.value.length) {
      setTimeout(() => {
        activateAds.value = true;
        setTimeout(() => {
          showFooterAd.value = !!currentCampaign.value?.footer_ad?.url;
          if (currentCampaign.value?.footer_ad?.url) has_footer_ad.value = true;
        }, 500);
      }, 5000);
    } else {
      noAdsInit.value = true;
    }
  } else {
    noAdsInit.value = true;
  }
}

async function apiFetchAdRunTime() {
  const data = await httpGet("fetchAdRunTime");
  // expects { ok:true, timer:{ values: number } }
  return data?.ok ? data.timer : null;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function fetchIntroVideo(clientName) {
  const filePath = `/intro-videos/${clientName}.mp4`;
  return new URL(filePath, import.meta.url).href;
}

function handleTime(e) {
  if (e.target.currentTime > 2) {
    handleCertificateNumber(
      certificate.value.Company.name.includes("Helzberg")
    );
  }

  if (!noAdsInit.value) {
    if (e.target.currentTime > timerTickerBeforeAd.value.values) {
      handleVideoPlayback();
    }
  }
}

function handleVideoPlayback() {
  if (campaings.value.length) {
    showFullPageAd.value = true;
    showFooterAd.value = false;
  } else {
    productVideoRef.value.play();
    if (olderCertificate.value) {
      showCertNumberForOldCerts.value = false;
    }
  }
}

function handleAdToggle(data) {
  for (const key in data) {
    if (key === "showFullPageAd") showFullPageAd.value = data[key];
    if (key === "showFooterAd") showFooterAd.value = data[key];
  }
}

function initCertificateViewingSequence() {
  const introContainer = document.querySelector(".intro-container");
  const video = document.getElementById("video");

  setTimeout(() => {
    introContainer.classList.remove("hidden");
    video.currentTime = 0;
    video.play();
  }, 500);

  setTimeout(() => {
    const mainContent = document.querySelector(".main-content");
    const templateContainer = document.querySelector(".template-container");
    const specsSection = document.querySelector(".specifications-section");

    const jewelryVideo = document.getElementById("jewelry-video");
    const ani1 = document.querySelectorAll(".animated-phase-one");
    const ani2 = document.querySelectorAll(".animated-phase-two");
    const ani3 = document.querySelectorAll(".animated-phase-three");
    const ani4 = document.querySelectorAll(".animated-phase-four");
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
        if (productShowCaseVideo.value) jewelryVideo.currentTime = 5;

        if (
          certificate.value.Company.id == "VRkL6hAx8zmT6IbcgLgn" &&
          (!certificate.value.Customer ||
            certificate.value.Customer.includes("TTC"))
        ) {
          const el = document.getElementById("client-logo");
          el.classList.add("dis-logo");
        }
        ani1.forEach(
          (el) => (el.style.animation = "scaleUp 0.7s ease-in forwards")
        );
        setTimeout(() => {
          ani2.forEach(
            (el) => (el.style.animation = "scaleUp 0.7s ease-in forwards")
          );
          setTimeout(() => {
            ani3.forEach(
              (el) => (el.style.animation = "scaleUp 0.7s ease-in forwards")
            );
            setTimeout(() => {
              ani4.forEach(
                (el) => (el.style.animation = "scaleUp 0.7s ease-in forwards")
              );
              productDesc.style.visibility = "visible";
              productDesc.style.animation = "scaleUp 0.7s ease-in forwards";
              descriptionLabel.classList.remove("hidden");
              descriptionLabel.style.animation =
                "scaleUp 0.7s ease-in forwards";
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
  introContainer.classList.remove("visible");
  mainContent.classList.remove("visible");
  introContainer.classList.add("hidden");
  mainContent.classList.add("hidden");
  introContainer.style.display = "none";
  mainContent.style.display = "none";
  productVideoRef.value.currentTime = 0;
  productVideoRef.value.play();
  initCertificateViewingSequence();
}

function fetchUserDevice() {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  return "Desktop";
}

function initImperfectionModal() {
  showModal.value = true;
  showImperfectionModal.value = true;
}

function handleCertificateNumber(isHZ) {
  const ms = isHZ ? 3000 : 3500;
  setTimeout(() => (showCertNumberForOldCerts.value = true), ms);
}

function closeModal() {
  showModal.value = false;
  showImperfectionModal.value = false;
}

function handleViewingTime() {
  const leaveTimestamp = Date.now();
  const timeSpentOnSite = leaveTimestamp - enterTimestamp.value;
  const secondsSpent = Math.floor(timeSpentOnSite / 1000);
  const minutesSpent = Math.floor(secondsSpent / 60);
  return { seconds: secondsSpent, minutes: minutesSpent };
}

async function fetchIPAddress() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip === import.meta.env.VITE_DIS_IP;
  } catch {
    return false;
  }
}

async function handleAnalyticsInitilization(data) {
  const timestampDate = DateTime.fromMillis(data.created).startOf("day");
  const now = DateTime.local().startOf("day");
  const isSystemIP = await fetchIPAddress();
  if (isSystemIP) return false;
  return !timestampDate.equals(now);
}

// Template resolver
const templateComponent = computed(() =>
  defineAsyncComponent(() =>
    import(
      `../components/templates/${route.params.certType}/${certificate.value.Template.id}.vue`
    )
  )
);

//Ignore
// async function handleAnalytics(userAction, saveViewingTime) {
//   if (initAnalytics.value) {
//     const viewingTime = handleViewingTime();
//     const userDevice = fetchUserDevice();
//     const productID = certificate.value.ClientSKU || certificate.value.CertNum;
//     const clientId = certificate.value.Company.id;
//     const country = "United States";
//     const locality = null;
//     const certificateData = certificate.value;

//     const handleAnalyticsPerCertificate = httpsCallable(
//       functions,
//       "analytics-handleAnalyticsPerClient"
//     );

//     try {
//       await handleAnalyticsPerCertificate({
//         clientId,
//         userDevice,
//         productID,
//         country,
//         locality,
//         viewingTime,
//         saveViewingTime,
//         userAction,
//         certificateData,
//       });
//       return true;
//     } catch (e) {
//       console.log(e);
//       return false;
//     }
//   }
// }

// ──────────────────────────────────────────────
// Mount flow
// ──────────────────────────────────────────────
onMounted(async () => {
  loading.value = true;

  // fetch certificate via API
  certificate.value = await apiFetchCertificate({
    certType: route.params.certType,
    certId: route.params.certId,
  });

  if (certificate.value) {
    if (certificate.value.isStolen) {
      stolenItem.value = true;
      certificateDoesNotExist.value = true;
      loading.value = false;
      return;
    }

    setTimeout(async () => {
      // diamond imperfections
      if (route.params.certType === "diamond") {
        if (certificate.value.imperfection) {
          imperfections.value = await apiFetchImperfections(
            certificate.value.imperfection.id
          );
        }
        has_imperfections.value = Boolean(imperfections.value);
      }

      // old vs new cert video paths 
      // if (certificate.value.Company.id === "1iX1oea29dw1sMzmzMyz") {
      //   await apiFetchDigitalCertificateVideo(certificate.value);
      // } else {
      introVideo.value = fetchIntroVideo(certificate.value.Company.name);
      await apiFetchShowCasingVideo(certificate.value.Video.name);
      await apiFetchClientLogo(certificate.value);
      initCertificateViewingSequence();
      // }

      if (!certificateDoesNotExist.value) {
        await apiFetchClientCampaign(
          certificate.value.Company.id,
          certificate.value
        );
      }

      isTemplate4.value = certificate.value.Template.id === 4;
      initAnalytics.value = await handleAnalyticsInitilization(
        certificate.value
      );

      // setTimeout(() => {
      //   handleAnalytics("view", false);
      // }, 2000);

      loading.value = false;
    }, 500);
  } else {
    loading.value = false;
    certificateDoesNotExist.value = true;
  }
});

// ──────────────────────────────────────────────
// Watchers
// ──────────────────────────────────────────────
watch(showFullPageAd, (toggled) => {
  showCertNumberForOldCerts.value = false;
  if (!toggled) {
    if (!olderCertificate.value) restartCertificateViewingSequence();
  }
});

watch(activateAds, async (toggled) => {
  if (toggled) {
    const t = await apiFetchAdRunTime(); // { values: number } or null
    if (t && typeof t.values !== "undefined") {
      timerTickerBeforeAd.value = t; // keep your existing .values usage
      // or, if you prefer a plain number everywhere:
      // timerTickerBeforeAd.value = t.values;
    }
  }
});

watch(loading, async (isLoading) => {
  if (!isLoading) {
    const loaderContainer = document.querySelector(".loader-container");
    loaderContainer.style.animation = "fadeOut 0.5s ease-in-out forwards";
    loaderContainer.style.display = "none";
  }
});

watch(certificateDoesNotExist, (certDoesNotExists) => {
  if (certDoesNotExists) {
    redirectTimer.value -= 1;
  }
});

watch(redirectTimer, (timer) => {
  if (!timer) {
    window.location = "https://diamondservicesusa.com";
  } else {
    setTimeout(() => {
      redirectTimer.value -= 1;
    }, 1000);
  }
});
</script>
