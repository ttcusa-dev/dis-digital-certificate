<template>
  <div class="full fill">
    <div class="form">
      <div class="offer-wrapper">
        <div style="text-align: center; font-size: 25px; font-weight: bold">
          Unlock
        </div>
        <div class="offer">$10 OFF</div>
        <div class="instructions">
          When you share your unique link to 5 individuals and they view your
          shared link you will receive your coupon via the email your provide.
        </div>
      </div>
      <div v-if="!showSharedLink" class="inputs">
        <input
          class="input"
          type="text"
          placeholder="Name"
          v-model="customer.name"
          name=""
          id=""
        />

        <input
          class="input"
          type="email"
          v-model="customer.email"
          placeholder="Email Address"
          name=""
          id=""
        />

        <div @click="saveFormAndCreateShareLink" class="btn">
          <p class="btn-text">Continue</p>
        </div>
      </div>
      <div v-else class="link-sharing">
        <div class="link-wrapper">
          <div class="link">
            {{ sharedLink }}
          </div>
          <div @click="copyToClipBoard" class="copy-btn">
            <span class="material-symbols-outlined"> content_copy </span>
          </div>
        </div>
        <div @click="handleShareLink" class="share-btn">
          <p class="btn-text">Share</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from "@/firebaseConfig.js";
export default {
  props: {
    client: {
      type: Object,
      default: Object,
    },
    productId: {
      type: String,
      default: "",
    },
    currentCampaign: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showSharedLink: false,
      sharedLink: "https://www.helzberg.com",
      customer: {
        name: "",
        email: "",
        amount_shared: 0,
        couponOfferHasBeenSent: false,
        clientAdLink: null,
        sharableCouponLink: null,
        userDevice: null,
      },
    };
  },
  methods: {
    copyToClipBoard() {
      navigator.clipboard
        .writeText(this.sharedLink)
        .then(() => {
          alert("Text copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    },
    async saveFormAndCreateShareLink() {
      const customerExists = await this.checkIFCusomterExists(
        this.customer.email
      );
      if (!customerExists) {
        this.customer.userDevice = this.userDevice;
        const customerId = await db.collection("coupon_customers").doc().id;
        this.customer.userDevice = this.fetchUserDevice();
        this.customer.clientAdLink = this.currentCampaign.url;
        this.sharedLink = `https://digital-cert-staging-diamondservicesusa.web.app/coupon-link/${this.productId}/${this.client.id}/${customerId}`;
        this.customer.sharableCouponLink = this.sharedLink;
        db.doc(`coupon_customers/${customerId}`).set(this.customer);
        this.showSharedLink = true;
      } else {
        alert("You already in the system. Share your link to receive offers");
        setTimeout(() => {
          this.$emit("close-coupon");
        }, 5000);
      }
    },
    async checkIFCusomterExists(email) {
      const customerQuery = await db
        .collection("coupon_customers")
        .where("email", "==", email)
        .get();

      return customerQuery.docs.length;
    },
    handleShareLink() {
      const shareData = {
        title: "Check this out!",
        text: "Helzberg is having a great sale I think you'll love",
        url: this.sharedLink,
      };

      if (navigator.share) {
        navigator
          .share(shareData)
          .then(() => {
            console.log("Share successful");
          })
          .catch((error) => {
            console.error("Error sharing:", error);
          });
      } else {
        alert("Sharing is not supported in your browser.");
      }
    },
    fetchUserDevice() {
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
    },
  },
};
</script>

<style scoped>
.instructions {
  font-size: 12px;
  font-weight: bold;
}
.close-btn {
  position: absolute;
  z-index: 100;
  color: red;
  top: 0;
  right: 7px;
  font-size: 28px;
  cursor: pointer;
}
.link-wrapper {
  border: 2px solid gray;
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 50px;
  align-items: center;
}
.link {
  font-size: 10px;
  font-weight: bold;
  padding: 5px;
}
.share-btn {
  margin-top: 30px;
  text-align: center;
  height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #95ccfd;
  color: white;
  border-radius: 25px;
  cursor: pointer;
}
.copy-btn {
  cursor: pointer;
}
.full {
  /* width: 100vw;
  height: 100vh; */
  height: 43vh;
}

.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* .fill img {
  flex-shrink: 0;
  max-width: 100%;
  min-height: 100%;
} */

.form {
  background-color: whitesmoke;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: initial;
}

.offer {
  text-align: center;
  font-size: 65px;
  font-style: italic;
  font-weight: bold;
}

.offer-wrapper {
  margin-bottom: 30px;
  display: block;
  position: relative;
  width: 84%;
}

.instruction {
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

.inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.input {
  width: 60%;
  height: 30px;
}

.btn {
  width: 240px;
  background-color: black;
  height: 50px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.btn-text {
  font-weight: bold;
}
</style>