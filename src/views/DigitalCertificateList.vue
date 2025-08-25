<template>
  <div class="container">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(cert, index) in certificates"
          :key="cert"
          class="swiper-slide"
          :id="cert.id"
        >
          <div class="video-wrapper">
            <div class="video-title">
              <span>{{ cert.certInfo.shape }} </span>
              <span>{{ cert.certInfo.type }} </span>
              <span>{{ cert.certInfo.caratWeight }}ct.tw</span>
            </div>
            <div v-if="displayPlayBtn !== cert.name" class="video-thumbnail">
              <img class="client-logo" :src="client.logo" alt="" srcset="" />
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
              <i style="font-size: 200px" class="material-icons">
                play_circle
              </i>
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
      <!-- If we need navigation buttons -->
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
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              class="form-input"
            />
          </div>
          <div v-if="sendType == 'email'" class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              class="form-input"
            />
          </div>

          <div v-else class="form-group">
            <label for="email" class="form-label">Phone</label>
            <input
              type="phone"
              id="phone"
              v-model="form.phone"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="storeId" class="form-label">Store ID</label>
            <input
              type="text"
              id="storeId"
              v-model="form.storeId"
              required
              class="form-input"
            />
          </div>
          <button
            type="submit"
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
import {
  httpsCallable,
  functions,
  db,
  getDoc,
  doc,
} from "../config/firebaseInit";
import Swiper from "swiper";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import Swal from "sweetalert2";

export default {
  components: {
    Swiper,
  },
  data() {
    return {
      certificates: [],
      processingEmail: false,
      showMenu: "",
      showModal: false,
      sendType: "email",
      displayPlayBtn: "",
      swiper: {},
      currentSlideIndex: 0,
      sendEmail: httpsCallable(functions, "sendEmail"),
      form: {
        email: null,
        name: null,
        storeId: null,
      },
      selectedCertificate: null,
    };
  },

  async created() {
    await this.getCertificateList();
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper(".swiper", {
        lazy: {
          loadPrevNext: true,
        },
        preloadImages: false,
        effect: "coverflow",
        coverflowEffect: {
          rotate: 40,
          slideShadows: false,
          depth: 1000,
        },
        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          slideChange: () => {
            this.loadCurrentVideo();
          },
          init: () => {
            this.loadCurrentVideo();
          },
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
      if (this.displayPlayBtn && this.displayPlayBtn != cert.name) {
        this.$refs[this.displayPlayBtn][0].pause();
        // this.$refs[this.displayPlayBtn][0].currentTime = 5.5;
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
      if (this.showMenu && this.showMenu == id) {
        this.showMenu = "";
      } else {
        this.showMenu = id;
      }
    },

    async getCertificateList() {
      const list_id = this.$route.params.list_id;
      let certificateList = await getDoc(
        doc(db, "digital_certificate_lists", list_id)
      );
      this.certificates = certificateList.data().certificates;

      console.log(this.certificates);
      this.client = certificateList.data().client;
    },
    validateEmailData() {
      for (const key in this.form) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          const element = this.form[key];
        }
      }
    },
    async sendCertificate() {
      this.processingEmail = true;
      const certificate = this.selectedCertificate;
      const sendData = {
        client: this.client.name,
        sku: certificate.name,
        storeId: this.storeId,
        storageRef: certificate.ref,
        downloadURL: `https://certificates.diamondservicesusa.com/jewelry/${certificate.name}`,
      };

      const emails = [];
      emails.push(this.form.email);
      await this.sendEmail({
        csv: false,
        subject: "Digital Certificate Video",
        filename: null,
        to: emails,
        message: `Hello ${this.form.name} here is the Digital Certificate ${sendData.sku} sent to you. Please click on this link to view <a href="${sendData.downloadURL}">Digital Certificate</a>`,
      });
      Swal.fire({
        text: "Digital Certificate Has Been Sent",
        icon: "success",
      });
      this.processingEmail = false;
      this.closeModal();
    },
  },
};
</script>

<style scoped>
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
  /* position: relative;
  width: 72%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85%; */
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
  /* border: 2px solid #fff; */
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
  font-size: 15px;
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
