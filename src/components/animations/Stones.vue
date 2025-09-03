<template>
  <div class="container">
    <MultiColorStones
      v-if="showMixedColorComp"
      :stoneShape="stoneShape"
      :stoneType="stoneType"
      :colorHex="colorHex"
      :colorMode="colorMode"
      :maxWidth="maxWidth"
      :color-hex="colorHex"
      :color-hex2="colorHex2"
      two-color-mode="conic"
      :segments="4"
      :angle-offset="178"
      :spin-duration="30.22"
      :spin="true"
      spin-direction="normal"
    />

    <SingleStones
      v-else
      :stoneShape="stoneShape"
      :stoneType="stoneType"
      :colorCode="colorCode"
      :colorMode="colorMode"
      :maxWidth="maxWidth"
    />
  </div>
</template>

<script setup>
import MultiColorStones from "./MultiColorStones.vue";
import SingleStones from "./SingleStones.vue";

import { onMounted, ref } from "vue";

const props = defineProps({
  stoneShape: { type: String, default: "" },
  stoneType: { type: String, default: "" },
  colorCode: { type: String, default: "#ff0000" },
  colorMode: { type: String, default: "color" },
  stoneColor: { type: String, default: "" },
  maxWidth: { type: String, default: "90px" },
});

const colorCodes = {
  Champagne: "#C88001",
  Black: "#0d0d0d",
  Blue: "#0000FF",
  Yellow: "#FFFF00",
  Brown: "#964B00",
};

const showMixedColorComp = ref(false);
const colorHex = ref("#0d0d0d");
const colorHex2 = ref("");

onMounted(() => {
  if (props.stoneColor.includes("/") && props.stoneType.includes("Mixed")) {
    showMixedColorComp.value = true;
    const color = props.stoneColor.split("/")[0].trim();
    const color2 = props.stoneColor.split("/")[1].trim();
    colorHex.value = colorCodes[color] || "#FFFFFF";
    colorHex2.value = colorCodes[color2] || "#FFFFFF";
  }
});
</script>

<style scoped>
/* Full-page black background */

/* Container auto-sizes to the GIF */
.container {
  display: inline-block;
  position: relative;

  /* tint color via `color` */
}

/* GIF image drives container size */
.container img {
  display: block;
  width: 100%;
  height: auto;
}

/* Overlay SVG covers the same area */

.tint {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: cover;

  /* This uses the GIF's alpha channel as the shape mask */
  mask-repeat: no-repeat;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: cover;
}
</style>
