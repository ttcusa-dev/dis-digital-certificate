<template>
  <div>
    <div
      v-show="showFullPageAd"
      v-if="currentCampaign.full_screen_ad.url"
      class="adpage-container full fill"
    >
      <img
        @click="handleAdsLink"
        class="ads"
        :src="currentCampaign.full_screen_ad.url"
        alt=""
        srcset=""
      />
    </div>
    <div
      v-show="showFooterAdToggle"
      class="ads-container bottom fill"
      :class="{ hideFooter: Boolean(currentCampaign.footer_ad.url) }"
      :ref="(el) => el.scrollIntoView({ behavior: 'smooth' })"
    >
      <img
        @click="handleAdsLink"
        class="banner ads"
        :src="currentCampaign.footer_ad.url"
        alt=""
        srcset=""
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, useTemplateRef, watch, computed } from "vue";

const emits = defineEmits(["handleAdToggle"]);

const props = defineProps({
  adUrl: { type: String, default: null },
  showFooterAd: { type: Boolean, default: false },
  showFullPageAd: { type: Boolean, default: false },
  currentCampaign: { type: Object, default: {} },
});

const showFullPageAdToggle = computed(() => props.showFullPageAd);
const showFooterAdToggle = computed(() => props.showFooterAd);
onMounted(() => {
  if (showFooterAdToggle) {
    // scrollToElement();
  }
});

watch(showFooterAdToggle, (e) => {
  if (e) {
    setTimeout(() => {
      // scrollToElement();
    }, 5000);
  }
});

watch(showFullPageAdToggle, (e) => {
  if (e) {
    setTimeout(() => {
      emits("handleAdToggle", { showFullPageAd: false });
      setTimeout(() => {
        emits("handleAdToggle", {
          showFooterAd: Boolean(props.currentCampaign.footer_ad.url),
        });
      }, 3000);
    }, 5000);
  }
});

function handleAdsLink() {
  emits("handle-analytics");
  setTimeout(() => {
    window.location = props.currentCampaign.url;
  }, 500);
}

function scrollToElement() {
  const el = useTemplateRef("footerAd");
  console.log({ el });
  if (el) {
    // Use el.scrollIntoView() to instantly scroll to the element
    el.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<style  scoped>
.hideFooter {
  display: none;
}

.ads-container,
.bottom {
  width: 100%;
  position: relative;
  height: 4em;
  bottom: -5px;
}

.ads {
  width: 100%;
  height: 100%;
}

/*  .banner {
   width: 20.3% !important;
 } */

.adpage-container,
.full {
  width: 100vw;
  height: 100vh;
}

.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.fill img {
  /*  flex-shrink: 0; */
  max-width: 100%;
  min-height: 100%;
}

@media only screen and (-webkit-min-device-pixel-ratio: 0) and (min-width: 1050px) {
  .adpage-container,
  .full {
    width: 30vw;
    height: 100vh;
    left: 36%;
    position: absolute;
  }

  .banner {
    width: 100% !important;
  }
}

/* @media only screen and (-webkit-min-device-pixel-ratio:0) and (max-width: 900px) {
   .ads-container,
   .bottom {
     left: 0px !important
   }
   .banner {
     width: 376px !important;
   }
 }

 @media only screen and (-webkit-min-device-pixel-ratio:0) and (min-width: 900px) {
   .ads-container,
   .bottom {
     left: 0;
   }
   .banner {
     width: 376px !important;
   }
 } */

@media only screen and (-webkit-min-device-pixel-ratio: 0) and (max-width: 500px) {
  .ads-container,
  .bottom {
    left: 0;
  }
  .banner {
    width: 100% !important;
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 0) and (max-width: 400px) {
  .ads-container,
  .bottom {
    left: 0;
  }
  .banner {
    width: 100% !important;
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 0) and (max-width: 400px) and (min-height: 700px) {
  .ads-container,
  .bottom {
    left: 0;
  }
  .banner {
    width: 100% !important;
  }
}

/* @media only screen and (-webkit-min-device-pixel-ratio:0) and (max-height: 800px) {
   .ads-container,
   .bottom {
     left: 0;
   }
   .banner {
     width: 90% !important;
   }
 } */
</style>
