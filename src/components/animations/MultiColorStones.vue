<template>
  <div class="container" :style="{ maxWidth: containerWidth }">
    <!-- Base image (drives natural size) -->
    <img v-if="stoneImage" :src="stoneImage" :alt="`${stoneShape}`" />

    <!-- Mask holder -->
    <div v-if="showOverlay" class="tint" :style="tintMaskStyle">
      <!-- Rotating gradient layer (clipped by parent mask) -->
      <div
        class="tint-gradient"
        :class="{ spinning: spin }"
        :style="tintGradientStyle"
      ></div>
    </div>
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
import { computed, ref } from "vue";

const props = defineProps({
  stoneShape: { type: String, default: "" },
  stoneType: { type: String, default: "" },

  // Colors
  colorHex: { type: String, default: "#ff0000" },
  colorHex2: { type: String, default: "" },

  // Blend with underlying image
  colorMode: { type: String, default: "color" }, // e.g. 'color', 'multiply', 'overlay'

  maxWidth: { type: String, default: "90px" },

  // Two-color layout
  twoColorMode: { type: String, default: "single" }, // 'single' | 'split' | 'conic'
  segments: { type: Number, default: 6 },
  angleOffset: { type: Number, default: 0 }, // degrees

  // Rotation controls
  spin: { type: Boolean, default: false },
  spinDuration: { type: Number, default: 6 }, // seconds per full turn
  spinDirection: { type: String, default: "normal" }, // 'normal' or 'reverse'
});

const showOverlay = ref(true);

const stoneImage = computed(() => {
  try {
    let stoneFileName = props.stoneShape
      .replace(/\b(Modified|Brilliant)\b/gi, "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    let filePath = `/stones/${stoneFileName}.gif`;

    if (props.stoneType === "Mixed Diamonds") {
      stoneFileName = props.stoneShape;
      filePath = `/multi-stone/Multi-${stoneFileName}.webp`;
    } else if (props.stoneShape.includes("Multi")) {
      stoneFileName = props.stoneShape.split(" ").join("-");
      filePath = `/multi-stone/${stoneFileName}.webp`;
    } else if (props.stoneType === "Mixed Colors") {
      stoneFileName = props.stoneShape.split(" ").join("-");
      filePath = `/multi-stone/Multi-Gems.webp`;
      showOverlay.value = false;
    }

    return new URL(filePath, import.meta.url).href;
  } catch (e) {
    console.warn("Image not found:", e);
    return null;
  }
});

const containerWidth = computed(() => {
  let maxWidth = props.maxWidth;
  if (props.stoneShape === "Baguette") maxWidth = "35px";
  if (props.stoneShape === "Marquise") maxWidth = "65px";
  if (props.stoneShape === "Multi Shape") maxWidth = "170px";
  if (props.stoneType === "Mixed Diamonds") maxWidth = "170px";
  return maxWidth;
});

// Build gradient background for the rotating child
const gradientBackground = computed(() => {
  const c1 = props.colorHex;
  const c2 = (props.colorHex2 || "").trim();
  const baseAngle = `${props.angleOffset}deg`;

  if (!c2 || props.twoColorMode === "single") {
    return c1; // solid fill
  }

  if (props.twoColorMode === "split") {
    // 50/50 linear split – rotation comes from spinning the child element
    return `linear-gradient(${baseAngle}, ${c1} 0 50%, ${c2} 50% 100%)`;
  }

  if (props.twoColorMode === "conic") {
    // Alternating wedges; rotation comes from spinning the child element
    const step = 360 / (props.segments || 1);
    return `repeating-conic-gradient(from ${baseAngle},
              ${c1} 0 ${step / 2}deg,
              ${c2} ${step / 2}deg ${step}deg)`;
  }

  return c1;
});

// The parent holds the mask and blend mode
const tintMaskStyle = computed(() => ({
  mixBlendMode: "color-burn",
  WebkitMaskImage: `url(${stoneImage.value})`,
  maskImage: `url(${stoneImage.value})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "cover",
  maskSize: "cover",
  WebkitMaskPosition: "center",
  maskPosition: "center",
}));

// The child is what actually rotates
const tintGradientStyle = computed(() => ({
  background: gradientBackground.value,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  "--spin-duration": `${props.spinDuration}s`,
  "--spin-direction": props.spinDirection,
}));
</script>

<style scoped>
.container {
  display: inline-block;
  position: relative;
}
.container img {
  display: block;
  width: 100%;
  height: auto;
}

/* Mask holder */
.tint {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Rotating gradient layer */
.tint-gradient {
  position: absolute;
  inset: 0;
  will-change: transform;
}

/* Spin animation (kept on the child, so the mask doesn't rotate) */
@keyframes tint-rotate {
  to {
    transform: rotate(360deg);
  }
}
.tint-gradient.spinning {
  animation: tint-rotate var(--spin-duration, 5s) linear infinite;
  animation-direction: var(--spin-direction, normal);
}
</style>
