<template>
  <div class="gauge-wrapper" :style="{ width: guageWidth }">
    <div class="gauge-container">
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        <!-- Outer circle -->
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#7c9cc8"
          stroke-width="2"
        />

        <!-- Background & progress arcs -->
        <path
          :id="`bgArc-${idPrefix}`"
          fill="none"
          stroke="white"
          stroke-width="20"
        />
        <path
          :id="`progress-${idPrefix}`"
          fill="none"
          stroke="#7c9cc8"
          stroke-width="20"
        />

        <!-- Pointer -->
        <polygon
          :id="`pointer-${idPrefix}`"
          points="0,0 -4,10 4,10"
          fill="#7c9cc8"
        />

        <!-- HTML inside SVG: this <div> will scale with the gauge -->
        <foreignObject x="50" y="50" width="100" height="100">
          <div
            class="value"
            style="
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              font-size: 30px;
              font-weight: bold;
            "
          >
            {{ shortenToAcronym(value) }}
          </div>
        </foreignObject>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePercentages } from "../../composables/getGuagePercent";
const { percentages } = usePercentages();

const props = defineProps({
  value: { type: String, default: "" },
  idPrefix: { type: String, default: "" },
  guageWidth: { type: String, default: "50px" },
});

function shortenToAcronym(value) {
  if (value.toLowerCase() == "very good") return value;
  if (value.length <= 4) return value.toUpperCase();

  // Remove vowels except the first character
  const firstChar = value[0].toUpperCase();
  const rest = value
    .slice(1)
    .replace(/[aeiou]/gi, "")
    .toUpperCase();

  // Limit total length to 4 characters
  const result = (firstChar + rest).slice(0, 4);

  return result;
}

function initGauge(bgId, progId, ptrId, percent) {
  const bg = document.getElementById(bgId);
  const prog = document.getElementById(progId);
  const ptr = document.getElementById(ptrId);

  const cx = 100;
  const cy = 100;
  const radius = 80;
  const pointerRadius = 70; // distance from center
  const startAngle = 225;
  const sweepAngle = 270;
  const duration = 2000;

  function polarToCartesian(cx, cy, r, deg) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(cx, cy, r, start, end, cw = false) {
    const p1 = polarToCartesian(cx, cy, r, start);
    const p2 = polarToCartesian(cx, cy, r, end);
    const largeArc = Math.abs(end - start) > 180 ? 1 : 0;
    const sweep = cw ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${p2.x} ${p2.y}`;
  }

  // draw full arc
  const endAngle = startAngle + sweepAngle;
  const d = describeArc(cx, cy, radius, startAngle, endAngle, true);
  bg.setAttribute("d", d);
  prog.setAttribute("d", d);

  // place pointer at start
  const init = polarToCartesian(cx, cy, pointerRadius, startAngle);
  ptr.setAttribute(
    "transform",
    `translate(${init.x},${init.y}) rotate(${startAngle})`
  );

  // animate
  setTimeout(() => {
    const L = prog.getTotalLength();
    prog.setAttribute("stroke-dasharray", L);
    prog.setAttribute("stroke-dashoffset", L);

    const t0 = performance.now();
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function frame(t) {
      const frac = Math.min((t - t0) / duration, 1);
      const cur = percent * easeOut(frac);

      prog.setAttribute("stroke-dashoffset", L * (1 - cur));

      const ang = startAngle + sweepAngle * cur;
      const pos = polarToCartesian(cx, cy, pointerRadius, ang);
      ptr.setAttribute(
        "transform",
        `translate(${pos.x},${pos.y}) rotate(${ang})`
      );

      if (frac < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, 300);
}

console.log(props.idPrefix);

onMounted(async () => {
  initGauge(
    `bgArc-${props.idPrefix}`,
    `progress-${props.idPrefix}`,
    `pointer-${props.idPrefix}`,
    percentages[props.value]
  );
});
</script>

<style scoped>
/* reset & base */

.gauge-wrapper {
  aspect-ratio: 1 / 1;
}
.gauge-container {
  width: 100%;
  height: 100%;
  animation: scaleIn 1s ease-out forwards;
  overflow: hidden;
}
svg {
  width: 100%;
  height: 100%;
  overflow: visible;
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
</style>