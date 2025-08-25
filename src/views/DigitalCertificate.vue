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
          <video id="video" class="logo-video" muted playsinline>
            <source src="../assets/images/helzberg-logo.mp4" type="video/mp4" />
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
          <div class="showcase-header">
            <img
              v-if="clientLogo"
              class="client-logo"
              :src="clientLogo"
              alt=""
              srcset=""
            />
          </div>
          <!-- Replace the div with video element -->
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
    </div>

    <div v-else>
      <div v-if="!showFullPageAd" class="right">
        <video
          ref="videoRef"
          class="digital-cert-vid"
          :src="digitalCertificateVideoURL"
          autoplay
          muted
          playsinline
          @timeupdate="handleTime"
          @ended="handleVideoPlayback"
        ></video>
        <!-- <div
        v-if="showDISCert"
        class="certificate-number-wrapper"
        :class="{
          meeting_settings: isHZMeeting,
          hz_settings: isHZ && !isHZMeeting,
          isTemplate4: isTemplate4,
          has_footer_ad: has_footer_ad,
          has_imperfections: has_imperfections,
        }"
      >
        <strong>
          DIS CERTIFICATE#:
          {{
            digitalCertificate &&
            digitalCertificate.ManufacturedAs === "Lab Grown"
              ? `LG${digitalCertificate.CertNum}`
              : $route.params.certificate_num
          }}</strong
        >
      </div> -->
      </div>
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
import { DateTime } from "luxon";

const route = useRoute();

const productVideoRef = useTemplateRef("productVideo");
const certificate = ref(null);
const clientLogo = ref(null);
const campaings = ref([]);
const currentCampaign = ref({});
const imperfections = ref(null);
const productShowCaseVideo = ref("@/assets/images/Emerlad.mp4");
const digitalCertificateVideoURL = ref(null);
const redirectTimer = ref(5);
const timerTickerBeforeAd = ref(20);
const enterTimestamp = ref(Date.now());
const showFooterAd = ref(false);
const showFullPageAd = ref(false);
const activateAds = ref(false);
const has_imperfections = ref(false);
const has_footer_ad = ref(false);
const noAdsInit = ref(false);
const olderCertificate = ref(false);
const certificateDoesNotExist = ref(false);
const loading = ref(false);

async function fetchCertificate() {
  let certificateDoc = await getDoc(
    doc(db, route.params.certType, route.params.certId)
  );
  if (!certificateDoc.exists) return false;
  else return certificateDoc.data();
}

async function fetchDigitalCertificate(certificate) {
  const { ClientSKU, CertNum, LineNum } = certificate;
  let certificateVideo;
  try {
    const digitalCertRef = collection(db, "digital_certificate_videos");
    const digitalCertQuery = query(
      digitalCertRef,
      where("name", "in", [ClientSKU, CertNum, LineNum])
    );
    certificateVideo = await getDocs(digitalCertQuery);
    if (certificateVideo.empty) {
      // DISLoading = false;
      // noCertificate = true;
      return false;
    }
    olderCertificate.value = true;
    certificateVideo = certificateVideo.docs[0];

    certificateVideo = Object.assign(
      { id: certificateVideo.id },
      certificateVideo.data()
    );
    digitalCertificateVideoURL.value = certificateVideo.meta.url;

    // if (certificateVideo.hasOwnProperty("globalSku")) {
    //   showCertNumber = true;
    // }

    // digitalCertificateVideo = certificateVideo;
    // digitalCertificateVideoURL.value = certificateVideo.meta.url;
    // skuCertificate = showCertNumber;

    // if (onlySKU) {
    //   skuCertificate = false;
    // }
    // isHZ = client ? client.name.includes("Helzberg") : false;
  } catch (error) {
    console.error("Error: ", error);
    if (certificate.CertificateVideo) {
      // digitalCertificateVideo = digitalCertificate.CertificateVideo;
      digitalCertificateVideoURL = digitalCertificate.CertificateVideo.url;
    } else {
      // noCertificate = true;
      // DISLoading = false;
    }
  }
}

async function fetchShowCasingVideo(videoFileName) {
  const videoRef = storageRef(storage, `product-display/${videoFileName}`);
  try {
    const [url] = await Promise.all([getDownloadURL(videoRef)]);
    productShowCaseVideo.value = url;
  } catch (error) {
    console.error({ error });
    // certificateDoesNotExist.value = true;
  }
}

async function fetchClientLogo(clientId) {
  let clientDoc = await getDoc(doc(db, "companies", clientId));
  clientLogo.value = clientDoc.data().images.url;
}

async function getAdRunTime() {
  let tickerDoc = await getDoc(doc(db, "attributes", "timerTickerBeforeAd"));
  if (!tickerDoc.exists) return null;
  else return tickerDoc.data();
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
      let data = await handleAnalyticsPerCertificate({
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

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
async function fetchImperfections(id) {
  let imperfection_doc = await getDoc(doc(db, "diamond_imperfections", id));
  if (imperfection_doc.exists) {
    imperfections.value = Object.assign(
      { id: imperfection_doc.id },
      imperfection_doc.data()
    );
    has_imperfections.value = true;
  }
}
function handleCertificateNumber() {
  if (skuCertificate) {
    const seconds = isHZ ? 4000 : 3200;
    setTimeout(() => {
      showDISCert = true;
    }, seconds);
  }
}

function handleViewingTime() {
  const leaveTimestamp = Date.now();
  const timeSpentOnSite = leaveTimestamp - enterTimestamp; // Time in milliseconds
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
  const isSystemIP = await this.fetchIPAddress();
  if (isSystemIP) return false;
  return !timestampDate.equals(now);
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

    loading.value = false;
    setTimeout(async () => {
      if (route.params.certType == "diamond") {
        if (certificate.value.imperfection)
          await fetchImperfections(certificate.value.imperfection.id);
      }
      if (certificate.value.created > 1756675200000) {
        await fetchDigitalCertificate(certificate.value);
      } else {
        await fetchShowCasingVideo(certificate.value.Video.name);
        await fetchClientLogo(certificate.value.Company.id);
      }

      await fetchClientCampaign(certificate.value.Company.id);
      // initAnalytics.value = await handleAnalyticsInitilization(
      //   certificate.value
      // );

      initCertificateViewingSequence();
      // setTimeout(() => {
      //   handleAnalytics("view", false);
      // }, 2000);
    }, 500);

    // setTimeout(async () => {
    //   await this.fetchClientCampaign(certificate.value.Company.id);
    //   this.initAnalytics = await this.handleAnalyticsInitilization(
    //     this.digitalCertificate
    //   );
    // }, 1000);
  } else {
    loading.value = false;
    certificateDoesNotExist.value = true;
    redirectTimer.value -= 1;
  }
});

watch(showFullPageAd, (toggled) => {
  if (!toggled) {
    restartCertificateViewingSequence();
  }
});

watch(activateAds, async (toggled) => {
  if (toggled) {
    timerTickerBeforeAd.value = await getAdRunTime();
  }
});

watch(redirectTimer, (timer) => {
  console.log({ timer });
  if (!timer) {
    // window.location = "https://diamondservicesusa.com";
  } else {
    setTimeout(() => {
      redirectTimer.value -= 1;
    }, 1000);
  }
});
</script>


