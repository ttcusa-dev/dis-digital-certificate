<template>
  <div class="container">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(cert, index) in certificates"
          :key="cert.id || cert.name || index"
          class="swiper-slide"
          :id="cert.id"
        >
          <div class="video-wrapper">
            <div class="video-title">
              <span>{{ cert.certInfo?.shape }} </span>
              <span>{{ cert.certInfo?.type }} </span>
              <span>{{ cert.certInfo?.caratWeight }}tw</span>
            </div>

            <div v-if="displayPlayBtn !== cert.name" class="video-thumbnail">
              <img class="client-logo" :src="client.logo" alt="" />
            </div>

            <video
              :ref="cert.name"
              @ended="stopVideo(cert)"
              :src="cert.url"
              type="video/mp4"
              preload="none"
              class="video-element"
            ></video>

            <div
              id="playButton"
              @click="playVideo(cert)"
              class="overlay-play-btn"
              v-if="displayPlayBtn !== cert.name"
            >
              <i style="font-size: 200px" class="material-icons">play_circle</i>
            </div>
          </div>

          <button
            v-if="currentSlideIndex === index"
            :ref="cert.id"
            @click="openModal('email', cert)"
            class="action-btn"
          >
            Send Video
          </button>
        </div>
      </div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <button @click="closeModal" class="close-btn">&times;</button>
        <form @submit.prevent="sendEmail">
          <h2 class="modal-title">Send certificate via {{ sendType }}</h2>

          <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input id="name" v-model="form.name" required class="form-input" />
          </div>

          <div v-if="sendType === 'email'" class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              required
              class="form-input"
            />
          </div>

          <div v-else class="form-group">
            <label for="phone" class="form-label">Phone</label>
            <input
              id="phone"
              type="tel"
              v-model="form.phone"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="storeId" class="form-label">Store ID</label>
            <input
              id="storeId"
              v-model="form.storeId"
              required
              class="form-input"
            />
          </div>

          <button
            type="button"
            :disabled="processingEmail"
            @click="sendCertificate"
            class="send-btn"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { httpsCallable, functions } from "../config/firebaseInit";
import Swiper from "swiper";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swal from "sweetalert2";

// === Cloud Functions base URL (HTTP onRequest) ===
const BASE_URL = "https://us-central1-diamonds-8cf72.cloudfunctions.net/digitalCertificateApi";

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

export default {
  components: { Swiper },
  data() {
    return {
      certificates: [],
      client: {},

      processingEmail: false,
      showMenu: "",
      showModal: false,
      sendType: "email",
      displayPlayBtn: "",
      swiper: {},
      currentSlideIndex: 0,

      // callable you already have for email
      // sendEmail: httpsCallable(functions, "sendEmail"),

      form: {
        email: null,
        name: null,
        storeId: null,
        phone: null,
      },
      selectedCertificate: null,
    };
  },

  async created() {
    await this.getCertificateList();
    this.initSwiper();
  },

  methods: {
    async sendEmail(data) {
      return await fetch(
        `https://us-central1-diamonds-8cf72.cloudfunctions.net/sendEmailApi`,
        data
      );
    },
    initSwiper() {
      this.swiper = new Swiper(".swiper", {
        lazy: { loadPrevNext: true },
        preloadImages: false,
        effect: "coverflow",
        coverflowEffect: { rotate: 40, slideShadows: false, depth: 1000 },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          slideChange: () => this.loadCurrentVideo(),
          init: () => this.loadCurrentVideo(),
        },
        modules: [Navigation, EffectCoverflow],
      });
    },

    loadCurrentVideo() {
      if (this.swiper.slides) {
        this.currentSlideIndex = this.swiper.activeIndex;
      }
    },

    stopVideo(cert) {
      this.$refs[cert.name][0].currentTime = 0;
      this.displayPlayBtn = null;
    },

    playVideo(cert) {
      if (this.displayPlayBtn && this.displayPlayBtn !== cert.name) {
        this.$refs[this.displayPlayBtn][0].pause();
      }
      this.displayPlayBtn = cert.name;
      this.$refs[cert.name][0].currentTime = 0;
      this.$refs[cert.name][0].play();
    },

    closeModal() {
      this.showModal = false;
      this.selectedCertificate = null;
    },

    openModal(type, certificate) {
      this.showModal = true;
      this.showMenu = "";
      this.selectedCertificate = certificate;
      this.sendType = type;
    },

    handleMenuDropdown(id) {
      this.showMenu = this.showMenu === id ? "" : id;
    },

    // ====== REPLACED: Firestore getDoc → HTTP API ======
    async getCertificateList() {
      const listId = this.$route.params.list_id;

      // Expecting a Cloud Function: GET /fetchCertificateList?listId=...
      const data = await httpGet("fetchCertificateList", { listId });

      if (data?.ok && data.found) {
        this.certificates = Array.isArray(data.certificates)
          ? data.certificates
          : [];
        this.client = data.client || {};
      } else {
        this.certificates = [];
        this.client = {};
        console.warn("Certificate list not found or API error", data?.error);
      }
      // console.log(this.certificates);
    },

    validateEmailData() {
      // Add any custom validation you want; currently relying on HTML5 required fields
      return true;
    },

    async sendCertificate() {
      if (!this.validateEmailData()) return;

      try {
        this.processingEmail = true;

        const certificate = this.selectedCertificate;
        const emails = [this.form.email].filter(Boolean);

        const downloadURL = `https://certificates.diamondservicesusa.com/jewelry/${certificate.name}`;

        await this.sendEmail({
          csv: false,
          subject: "Digital Certificate Video",
          filename: null,
          to: emails,
          message: `Hello ${this.form.name}, here is the Digital Certificate ${certificate.name} sent to you. Please click on this link to view <a href="${downloadURL}">Digital Certificate</a>`,
        });

        Swal.fire({
          text: "Digital Certificate Has Been Sent",
          icon: "success",
        });
      } catch (e) {
        console.error(e);
        Swal.fire({ text: "Failed to send certificate", icon: "error" });
      } finally {
        this.processingEmail = false;
        this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
/* (unchanged styles) */
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/LC-background.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.video-title {
  color: white;
  font-size: 25px;
  text-decoration: underline;
  margin-bottom: 20px;
  text-align: center;
}
.swiper {
  width: 100%;
  height: 100vh;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.video-wrapper {
  position: relative;
  width: 272px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 600px;
}
.video-element {
  display: block;
  position: relative;
  width: 88%;
  height: 100%;
  border: 2px solid #3d3d3d;
  border-radius: 14px !important;
}
.video-thumbnail {
  width: 100%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.client-logo {
  position: absolute;
  width: 58%;
  top: 49.3%;
}
.overlay-play-btn {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  z-index: 999;
  overflow: hidden;
}
.overlay-play-btn i {
  pointer-events: none;
}
.action-btn {
  background-color: #3498db;
  color: #fff;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}
.action-btn:hover {
  background-color: #2980b9;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.modal {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 500px;
}
.modal-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
}
.form-group {
  margin-bottom: 20px;
}
.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
.form-input {
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.send-btn {
  background-color: #3498db;
  color: #fff;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
.send-btn:hover {
  background-color: #2980b9;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  border: none;
  background-color: #fff;
  color: red;
  cursor: pointer;
}
@media (max-width: 850px) {
  .modal {
    width: 90%;
  }
}
@media (min-height: 500px) and (max-width: 1000px) {
  .list-wrapper {
    width: 90%;
    position: relative;
    top: 12px;
    left: 4%;
    padding: 0;
    overflow: auto;
  }
  .container {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
  }
  .certificate {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
  }
  video {
    height: 100% !important;
  }
}
@media (max-width: 850px) {
  .setting-dropdown {
    width: 300px;
    left: -300px;
  }
}
</style>
