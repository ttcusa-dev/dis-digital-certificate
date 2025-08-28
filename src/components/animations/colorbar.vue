<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
    "
  >
    <div class="bar-wrapper" :style="{ maxWidth }">
      <div class="bar-container">
        <svg viewBox="0 0 200 50" preserveAspectRatio="xMidYMid meet">
          <!-- static background bar with flat ends -->
          <line
            x1="10"
            y1="25"
            x2="190"
            y2="25"
            stroke="white"
            stroke-width="5"
            stroke-linecap="butt"
          />

          <!-- animated progress bar with flat ends -->
          <line
            :id="`barProg-${idPrefix}`"
            x1="10"
            y1="25"
            x2="10"
            y2="25"
            :stroke="barColor[color.template]"
            stroke-width="5"
            stroke-linecap="butt"
          />

          <!-- pointer + letter group -->
          <g :id="`_pointer-${idPrefix}`">
            <!-- arrow subgroup (scaled in JS) -->
            <g :id="`arrow-${idPrefix}`">
              <polygon points="0,0 -7,-10 7,-10" fill="#287bc9" />
            </g>
            <!-- text travels with the arrow -->
            <text
              class="colorText"
              :style="{ fontSize }"
              :id="`pointerText-${idPrefix}`"
              x="0"
              y="0"
              text-anchor="middle"
            >
              {{ color.value }}
            </text>
          </g>
        </svg>
      </div>
    </div>
    <div class="label">Color - {{ color.template }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getColorAttribute } from "../../composables/getColorAttributes";
const { percentages, barColor } = getColorAttribute();

const props = defineProps({
  idPrefix: { type: String, default: "" },
  maxWidth: { type: String, default: "400px" },
  fontSize: { type: String, default: "8px" },
  color: { type: Object, default: {} },
});

// scale for the triangle (1 = original size, 0.5 = half size, etc.)
const arrowScale = 0.5;
// vertical text offset (negative moves up, positive moves down)
const textYOffset = -7;

function initBar(progId, ptrId, textId, arrowId, percent) {
  const bar = document.getElementById(progId);
  const ptr = document.getElementById(ptrId);
  const arrow = document.getElementById(arrowId);
  const txt = document.getElementById(textId);

  // apply scale to the arrow subgroup
  arrow.setAttribute("transform", `scale(${arrowScale})`);
  // set the text vertical offset
  txt.setAttribute("y", textYOffset);

  const startX = 10; // bar start x
  const length = 180; // total available length (190 − 10)
  const centerY = 25; // bar center-line y

  // read stroke-width and compute pointerY so arrow tip flushes with top edge
  const strokeWidth = Number(bar.getAttribute("stroke-width"));
  const pointerY = centerY - strokeWidth / 2;

  // initial state: 0% progress
  bar.setAttribute("x2", startX);
  ptr.setAttribute("transform", `translate(${startX},${pointerY})`);

  // animate after scale-in
  setTimeout(() => {
    const duration = 2000;
    const t0 = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(time) {
      const frac = Math.min((time - t0) / duration, 1);
      const eased = easeOut(frac);
      const curX = startX + length * (percent * eased);

      // update bar length
      bar.setAttribute("x2", curX);
      // move arrow + letter
      ptr.setAttribute("transform", `translate(${curX},${pointerY})`);

      if (frac < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, 300);
}
onMounted(() => {
  setTimeout(() => {
    initBar(
      `barProg-${props.idPrefix}`,
      `_pointer-${props.idPrefix}`,
      `pointerText-${props.idPrefix}`,
      `arrow-${props.idPrefix}`,
      percentages[props.color.template][props.color.value]
    );
  }, 300);
});
// initialize at 60% progress (0.6)
</script>

<style scoped>
.bar-wrapper {
  width: 90vmin;
  aspect-ratio: 4 / 1;
  display: block;
  height: 43px;
  overflow: hidden;
}
.bar-container {
  width: 100%;
  height: 100%;
  animation: scaleIn-65ac06eb 1s ease-out forwards;
  overflow: hidden;
}

svg {
  width: 100%;
  height: 215%;
  margin-top: -15px;
  overflow: hidden;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.colorText {
  font-family: "Roboto", Arial, sans-serif;
  font-weight: 700;
  fill: #ffffff;
  font-style: italic;
}
</style>
