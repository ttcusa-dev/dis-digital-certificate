<!-- components/RingStudsInfo.vue -->
<template>
  <section class="ring‑studs">
    <div class="subheader">{{ certificate.JewelryType }}</div>
    <div class="label">Style</div>
    <div class="style-row">
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <!-- two columns -->
    <div class="columns">
      <div v-for="(stone, i) in stones" :key="i" class="col">
        <!-- index bubble -->
        <div class="index">{{ i + 1 }}</div>

        <!-- measurements -->
        <div class="value">{{ certificate.MainStoneMeasurements }}</div>
        <div class="label">CENTER STONE MEASUREMENTS</div>

        <!-- shape -->
        <div class="value">{{ certificate.MainStoneShape }}</div>
        <div class="label">CENTER STONE SHAPE</div>

        <!-- cut -->
        <div class="value">{{ certificate.MainStoneCut }}</div>
        <div class="label">CUT</div>

        <!-- color slider -->
        <div class="slider">
          <div class="fill" :style="{ width: stone.colorPercent + '%' }"></div>
          <div
            class="thumb"
            :style="{ left: stone.colorPercent + '%' }"
            :data-label="stone.colorGrade"
          ></div>
        </div>
        <div class="label">COLOR</div>

        <!-- diagram + CTW / table / depth -->
        <div class="diagram">
          <slot name="diagram" :stone="stone" />
          <div class="ctw">{{ stone.ctw }} CTW</div>
        </div>
        <div class="table-depth">
          <div>{{ stone.table }} <span class="small">TABLE</span></div>
          <div>{{ stone.depth }} <span class="small">DEPTH</span></div>
        </div>

        <!-- clarity & polish gauges (same as left side) -->
        <div class="gauges">
          <!-- <Gauge :value="stone.clarity"  label="Clarity" />
          <Gauge :value="stone.polish"   label="Polish"  /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import Gauge from './Gauge.vue'   // your existing gauge component

defineProps({
  certificate: { type: Object, default: {} },
  ringNumber: { type: String, default: "G1ERRD500WM" },
  type: { type: String, default: "STUDS" },
  style: { type: String, default: "STYLE" },
  stones: {
    type: Array,
    default: () => [
      {
        measurements: "8.75 × 8.81 × 5.46 MM",
        shape: "Round Brilliant",
        cut: "Ideal",
        colorGrade: "G",
        colorPercent: 82,
        ctw: "2.61",
        table: "59.0",
        depth: "62.2",
        clarity: "VS1",
        polish: "EXCL",
      },
      {
        measurements: "8.79 × 8.80 × 5.44 MM",
        shape: "Round Brilliant",
        cut: "Ideal",
        colorGrade: "G",
        colorPercent: 82,
        ctw: "2.63",
        table: "59.5",
        depth: "62.5",
        clarity: "VS1",
        polish: "EXCL",
      },
    ],
  },
  comments: {
    type: String,
    default:
      "Diamond Stud Earrings with 2 round lab grown diamonds weighing approximately 5.24 ct. tw. in 14K White Gold. Inscriptions LG613370778; LG631448548. Diamond weight estimated. Graded as mounting permits.",
  },
});
</script>

<style scoped>
.ring‑studs {
  color: #e1e8ed;
  padding: 2rem 1rem;
  border-radius: 0.75rem;
  text-align: center;
}
.ring‑number {
  opacity: 0.6;
  margin-bottom: 0.5rem;
}
.subheader {
  font-size: 0.75rem;
  opacity: 0.6;
  text-transform: uppercase;
}
.label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

/* 1) STYLE heading with lines */
.style-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}
.style-row .line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}
.style-row .style {
  padding: 0 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.6;
}

/* 2) Vertical divider */
.columns {
  position: relative;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.columns::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
}

/* optional: add a little breathing room on each side */
.col {
  flex: 1;
  padding: 0 0.5rem;
}
.index {
  width: 24px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  line-height: 24px;
  margin: 0 auto 0.75rem;
  opacity: 0.6;
}
.value {
  font-size: 0.9rem;
  font-weight: 500;
}
.label {
  font-size: 0.65rem;
  opacity: 0.6;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.slider {
  position: relative;
  height: 4px;
  background: #2c3742;
  border-radius: 2px;
  margin: 0.5rem 0 0.25rem;
}
.fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #fff;
  border-radius: 2px 0 0 2px;
}
.thumb {
  position: absolute;
  bottom: 100%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #fff;
  z-index: 2;
}
.thumb::after {
  content: attr(data-label);
  position: absolute;
  bottom: calc(100% + 8px + 4px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.65rem;
  white-space: nowrap;
}
.diagram {
  position: relative;
  margin: 1rem 0 0.5rem;
}
.ctw {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 500;
}
.table-depth {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  opacity: 0.6;
  margin-bottom: 1rem;
}
.small {
  display: block;
  font-size: 0.6rem;
  text-transform: uppercase;
}

.gauges {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.comments {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.65rem;
  line-height: 1.4;
  text-align: left;
}
</style>
