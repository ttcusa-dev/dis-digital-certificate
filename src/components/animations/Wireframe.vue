<template>
  <div class="container" :style="{ maxWidth: containerWidth }">
    <div class="wireframe">
      <div class="wireframe-info" :class="className">
        <div class="value">{{ handleCaratWeight(weight) }}</div>
        <div v-if="showLabel" class="label">TOTAL CARAT WEIGHT</div>
      </div>
      <img v-if="wireframe" :src="wireframe" :alt="`${jewelryShape}`" />
      <div
        class="tint"
        :style="{
          backgroundColor: colorHex,
          WebkitMaskImage: `url(${wireframe})`,
          maskImage: `url(${wireframe})`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  jewelryShape: { type: String, default: "Round" },
  jewelryType: { type: String, default: "" },
  weight: { type: Number, default: 0 },
  colorHex: { type: String, default: "#287bc9" },
  maxWidth: { type: String, default: "300px" },
});

const className = ref("");
const showLabel = ref(true);
if (props.jewelryType == "Pendant") {
  className.value = "pendant";
} else if (props.jewelryType == "Ring") {
  className.value = "ring";
} else if (props.jewelryType == "Necklace") {
  className.value = "necklace";
} else if (props.jewelryType == "Earring" || props.jewelryType == "Earrings") {
  className.value = "earring";
} else if (props.jewelryType == "Studs") {
  className.value = "studs";
}

const wireframe = computed(() => {
  let wireframeFileName = props.jewelryType;
  if (props.jewelryType == "Pendant") {
    const shape = props.jewelryShape.split(" ")[0];
    wireframeFileName = `${props.jewelryType}-${shape}`;
  }

  try {
    return new URL(
      `../../assets/wireframes/${wireframeFileName}.webp`,
      import.meta.url
    ).href;
  } catch (e) {
    console.warn("Image not found:", e);
    return null;
  }
});

const containerWidth = computed(() => {
  let maxWidth = props.maxWidth;

  if (props.jewelryShape == "Baguette") maxWidth = "35px";

  return maxWidth;
});

const handleCaratWeight = (value) => {
  if (typeof value == "number") value = parseInt(value).toFixed(2);
  if (value <= 0 || !value) {
    showLabel.value = false;
    return "Diamond Accent";
  } else {
    return value;
  }
};
</script>

<style scoped>
/* Full-page black background */

/* Container auto-sizes to the GIF */
.container {
  display: inline-block;
  position: relative;

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
  height: 88%;
}

.wireframe-info {
  position: absolute;
  z-index: 99;
  font-size: 18px;
}

.pendant {
  top: -4px;
  margin-left: 10px;
}

.ring {
  width: 100px;
  margin-left: -35px;
}

.necklace {
  margin-top: 50px;
}

.studs {
  margin-top: -120px;
}

.earring {
  position: absolute;
  z-index: 99;
  font-size: 17px;
  margin-right: 74px;
  width: 115px;
}

.wireframe-info .label {
  font-size: 1rem;
  opacity: 1 !important;
  text-transform: uppercase;
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