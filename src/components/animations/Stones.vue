<template>
  <div class="container" :style="{ maxWidth: containerWidth }">
    <!-- GIF that sizes the container -->
    <img v-if="stoneImage" :src="stoneImage" :alt="`${stoneShape} GIF`" />
    <div
      class="tint"
      :style="{
        backgroundColor: colorHex,
        WebkitMaskImage: `url(${stoneImage})`,
        maskImage: `url(${stoneImage})`,
      }"
    ></div>
  </div>
  <div class="gem-type" style="width: fit-content">
    <div class="value" style="width: 200px; font-size: 12px">
      {{ stoneType }}
    </div>
    <div style="width: 200px; font-size: 12px" class="round label">
      ( {{ stoneShape }} )
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  stoneShape: { type: String, default: "" },
  stoneType: { type: String, default: "" },
  colorHex: { type: String, default: "#ff0000" },
  maxWidth: { type: String, default: "55px" },
});

const stoneImage = computed(() => {
  try {
    let stoneFileName = props.stoneShape.toLowerCase();
    if (props.stoneType == "Pearl") {
      stoneFileName = props.stoneType.toLowerCase();
    } else if (props.stoneType == "Opal") {
      stoneFileName = `${props.stoneType.toLowerCase()} ${props.stoneShape.toLowerCase()}`;
    }

    return new URL(
      `../../assets/images/stone animation gifs/${stoneFileName}.gif`,
      import.meta.url
    ).href;
  } catch (e) {
    console.warn("Image not found:", e);
    return null;
  }
});

const containerWidth = computed(() => {
  let maxWidth = props.maxWidth;

  if (props.stoneShape == "Baguette") maxWidth = "35px";

  return maxWidth;
});

console.log(props);
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
  mix-blend-mode: color;
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