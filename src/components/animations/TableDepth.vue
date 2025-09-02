<template>
  <div class="container" :style="{ maxWidth }">
    <div class="wireframe">
      <div v-if="showCTW" class="ctw">{{ weight }} CTW</div>
      <div class="table-info">
        <div class="value">{{ table }}</div>
        <div class="label">Table</div>
      </div>
      <img v-if="wireframe" :src="wireframe" :alt="`${jewelryShape}`" />
      <div class="depth-info">
        <div class="value">{{ depth }}</div>
        <div class="label">Depth</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  table: { type: String, default: "0" },
  depth: { type: String, default: "0" },
  weight: { type: String, default: "0" },
  showCTW: { type: Boolean, default: false },
  colorHex: { type: String, default: "#FFFFFF" },
  maxWidth: { type: String, default: "115px" },
});

const wireframe = computed(() => {
  try {
    return new URL(
      `../../assets/wireframes/TableDepthDiamond.gif`,
      import.meta.url
    ).href;
  } catch (e) {
    console.warn("Image not found:", e);
    return null;
  }
});
</script>

<style scoped>
/* Full-page black background */

/* Container auto-sizes to the GIF */
.container {
  display: inline-block;
  position: relative;
  width: 115px;
  height: 100px;
  /* tint color via `color` */
}

.wireframe {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.wireframe img {
  width: 100%;
  height: 100%;
}

.wireframe-info {
  position: absolute;
  z-index: 99;
  font-size: 18px;
}

.ctw {
  position: absolute;
  transform: translate(-39%, 35%);
  font-size: 10px;
  font-weight: 900;
  background-color: #414c62d6;
  padding: 3px;
  width: 34px;
  height: 29px;
  text-align: center;
  border-radius: 8px;
}

.table-info {
  width: 100px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 3px;
  padding-left: 20px;
}

.depth-info {
  position: absolute;
  right: -1rem;
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

/* .wireframe-info .label {
  font-size: 1rem;
  opacity: 1 !important;
  text-transform: uppercase;
} */

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
  mix-blend-mode: hue;
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