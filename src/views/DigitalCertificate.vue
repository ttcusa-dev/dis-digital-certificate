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
    <div v-if="!olderCertificate">
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
          <div class="showcase-header" :class="{ has_footer: has_footer_ad }">
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
          <div class="template-container">
            <component
              @view-imperfections="initImperfectionModal"
              :is="templateComponent"
              :certificate="certificate"
              :hasImperfection="has_imperfections"
            />
          </div>
          <div class="bottom">
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
      <div v-if="!showFullPageAd" class="right">
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
        <div
          v-if="showCertNumberForOldCerts"
          class="certificate-number-wrapper"
          :class="{
            hz_theme: certificate.Company.name.includes('Helzberg'),
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
      @handleAdToggle="handleAdToggle"
      @handle-analytics="handleAnalytics('click', true)"
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

import {
  httpsCallable,
  functions,
  db,
  getDoc,
  doc,
  getDocs,
  where,
  orderBy,
  endAt,
  query,
  collection,
  getDownloadURL,
  ref as storageRef,
  storage,
} from "../config/firebaseInit";

import { useRoute } from "vue-router";
import Footer from "../components/Footer.vue";
import AdPage from "../components/AdPage.vue";
import Imperfections from "../components/Imperfections.vue";
import Modal from "../components/Modal.vue";

import { DateTime } from "luxon";

const route = useRoute();
const productVideoRef = useTemplateRef("productVideo");

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
const stolenItem = ref(false);
const showCertNumberForOldCerts = ref(false);
const noAdsInit = ref(false);
const olderCertificate = ref(false);
const certificateDoesNotExist = ref(false);
const initAnalytics = ref(false);
const loading = ref(false);

async function fetchCertificate() {
  let certificateDoc = await getDoc(
    doc(db, route.params.certType, route.params.certId)
  );
  if (!certificateDoc.exists) return false;
  else return certificateDoc.data();
}

async function fetchDigitalCertificate(certificate) {
  const { ClientSKU, CertNum, LineNum, OrderNum } = certificate;
  let certificateVideo;
  try {
    const digitalCertRef = collection(db, "digital_certificate_videos");
    const digitalCertQuery = query(
      digitalCertRef,
      where("name", "in", [ClientSKU, CertNum, `${OrderNum}-${LineNum}`])
    );
    certificateVideo = await getDocs(digitalCertQuery);
    if (certificateVideo.empty) {
      throw "No Digital Certificate Has Been Found";
    }
    olderCertificate.value = true;
    certificateVideo = certificateVideo.docs[0];

    certificateVideo = Object.assign(
      { id: certificateVideo.id },
      certificateVideo.data()
    );
    digitalCertificateVideoURL.value = certificateVideo.meta.url;
    handleCertificateNumber(certificate.Company.name.includes("Helzberg"));
  } catch (error) {
    console.error("Error: ", error);
    if (certificate.CertificateVideo) {
      digitalCertificateVideoURL.value = certificate.CertificateVideo.url;
      olderCertificate.value = true;
    } else {
      certificateDoesNotExist.value = true;
    }
  }
}

async function fetchShowCasingVideo(videoFileName) {
  const fileName = videoFileName.replace(/_001.*$/, "");
  const videoRef = storageRef(storage, `product-display/${fileName}`);
  try {
    const [url] = await Promise.all([getDownloadURL(videoRef)]);
    productShowCaseVideo.value = url;
  } catch (error) {
    noProductShowcasingVideo.value = true;
    // certificateDoesNotExist.value = true;
  }
}

async function fetchClientLogo(cert) {
  let clientDoc = await getDoc(doc(db, "companies", cert.Company.id));
  clientLogo.value = cert.CustomerLogo || clientDoc.data().images.url;
}

async function getAdRunTime() {
  let tickerDoc = await getDoc(doc(db, "attributes", "timerTickerBeforeAd"));
  if (!tickerDoc.exists) return null;
  else return tickerDoc.data();
}

async function handleAnalytics(userAction, saveViewingTime) {
  if (initAnalytics) {
    const viewingTime = handleViewingTime();
    const userDevice = fetchUserDevice();
    const productID = certificate.value.ClientSKU || certificate.value.CertNum;
    const clientId = certificate.value.Company.id;
    const country = "United States";
    const locality = null;
    const certificateData = certificate.value;
    const handleAnalyticsPerCertificate = httpsCallable(
      functions,
      "analytics-handleAnalyticsPerClient"
    );

    try {
      await handleAnalyticsPerCertificate({
        clientId,
        userDevice,
        productID,
        country,
        locality,
        viewingTime,
        saveViewingTime,
        userAction,
        certificateData,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

async function fetchImperfections(id) {
  let imperfection_doc = await getDoc(doc(db, "diamond_imperfections", id));
  if (!imperfection_doc.exists) return false;
  return Object.assign({ id: imperfection_doc.id }, imperfection_doc.data());
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

function fetchIntroVideo(clientName) {
  let filePath = `../assets/intro-videos/${clientName}.mp4`;
  return new URL(filePath, import.meta.url).href;
}

function handleTime(e) {
  if (!noAdsInit) {
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
      handleCertificateNumber(
        certificate.value.Company.name.includes("Helzberg")
      );
    }
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
  const introContainer = document.querySelector(".intro-container");
  const video = document.getElementById("video");

  setTimeout(() => {
    introContainer.classList.remove("hidden");
    video.currentTime = 0; // Set the video to start from the beginning
    video.play();
  }, 500);

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
        if (productShowCaseVideo.value) jewelryVideo.currentTime = 5;
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
              productDesc.style.visibility = "visible";
              productDesc.style.animation = "scaleUp 0.7s ease-in forwards";
              descriptionLabel.classList.remove("hidden");
              descriptionLabel.style.animation =
                "scaleUp 0.7s ease-in forwards";
              // setTimeout(() => {
              //   productDesc.style.visibility = "visible";
              //   productDesc.style.animation = "scaleUp 0.7s ease-in forwards";

              //   descriptionLabel.classList.remove("hidden");
              //   descriptionLabel.style.animation =
              //     "scaleUp 0.7s ease-in forwards";
              // }, 300);
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
  productVideoRef.value.currentTime = 0; // Set the productVideoRef to start from the beginning
  productVideoRef.value.play();

  initCertificateViewingSequence();
}

function fetchUserDevice() {
  const userAgent = navigator.userAgent;
  if (/Android/i.test(userAgent)) {
    console.log("This is an Android device");
    return "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    console.log("This is an iOS device");
    return "iOS";
  } else {
    console.log("This is a desktop computer");
    return "Desktop";
  }
}

function initImperfectionModal() {
  showModal.value = true;
  showImperfectionModal.value = true;
}

function handleCertificateNumber(isHZ) {
  const seconds = isHZ ? 4000 : 3200;
  setTimeout(() => {
    showCertNumberForOldCerts.value = true;
  }, seconds);
}

function closeModal() {
  showModal.value = false;
  showImperfectionModal.value = false;
}

function handleViewingTime() {
  const leaveTimestamp = Date.now();
  const timeSpentOnSite = leaveTimestamp - enterTimestamp.value; // Time in milliseconds
  // You can convert the time to seconds, minutes, or hours as needed
  const secondsSpent = Math.floor(timeSpentOnSite / 1000); // Convert milliseconds to seconds
  const minutesSpent = Math.floor(secondsSpent / 60); // Convert seconds to minutes
  return { seconds: secondsSpent, minutes: minutesSpent };
}

async function fetchIPAddress() {
  try {
    const IPAdd = await axios.get("https://api.ipify.org?format=json");
    return IPAdd.data.ip === process.env.VUE_APP_DIS_IP;
  } catch (error) {
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

const templateComponent = computed(() =>
  defineAsyncComponent(() =>
    import(
      `../components/templates/${route.params.certType}/${certificate.value.Template.id}.vue`
    )
  )
);

onMounted(async () => {
  loading.value = true;
  certificate.value = await fetchCertificate();
  // After 5 seconds, hide loader and show intro
  if (certificate.value) {
    if (certificate.value.isStolen) {
      stolenItem.value = true;
      certificateDoesNotExist.value = true;
      loading.value = false;
      return null;
    }

    setTimeout(async () => {
      if (route.params.certType == "diamond") {
        if (certificate.value.imperfection)
          imperfections.value = await fetchImperfections(
            certificate.value.imperfection.id
          );
        has_imperfections.value = Boolean(imperfections.value);
      }
      if (certificate.value.created < 1757381164000) {
        await fetchDigitalCertificate(certificate.value);
      } else {
        introVideo.value = fetchIntroVideo(certificate.value.Company.name);
        await fetchShowCasingVideo(certificate.value.Video.name);
        await fetchClientLogo(certificate.value);
        initCertificateViewingSequence();
      }

      if (!certificateDoesNotExist.value) {
        await fetchClientCampaign(certificate.value.Company.id);
      }

      initAnalytics.value = await handleAnalyticsInitilization(
        certificate.value
      );

      setTimeout(() => {
        handleAnalytics("view", false);
      }, 2000);
      loading.value = false;
    }, 500);
  } else {
    loading.value = false;
    certificateDoesNotExist.value = true;
  }
});

watch(showFullPageAd, (toggled) => {
  if (!toggled) {
    if (!olderCertificate.value) restartCertificateViewingSequence();
    else
      handleCertificateNumber(
        certificate.value.Company.name.includes("Helzberg")
      );
  } else {
    if (olderCertificate.value) showCertNumberForOldCerts.value = false;
  }
});

watch(activateAds, async (toggled) => {
  if (toggled) {
    timerTickerBeforeAd.value = await getAdRunTime();
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
    //window.location = "https://diamondservicesusa.com";
  } else {
    setTimeout(() => {
      redirectTimer.value -= 1;
    }, 1000);
  }
});
</script>
