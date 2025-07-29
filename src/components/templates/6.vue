
<template>
  <section class="jewelry-info">
    <div class="jewelry-info__top animated-phase-one">
      <div class="jewelry-info__item">
        <div class="value">{{ certificate.JewelryType }}</div>
        <div class="label">Style</div>
      </div>
      <div class="jewelry-info__item">
        <div class="value">{{ certificate.MainStoneShape }}</div>
        <div class="label">Center Stone Shape</div>
      </div>
    </div>

    <!-- Color slider -->
    <div class="jewelry-info__color animated-phase-two">
      <div class="color">{{ certificate.MainStoneColor.value }}</div>
      <div class="thumb" :style="{ left: colorPercent + '%' }"></div>
      <div class="slider">
        <div class="fill" :style="{ width: colorPercent + '%' }"></div>
      </div>
      <div class="label">Color</div>
    </div>

    <!-- Weight / Measurements / Diagram -->
    <div class="jewelry-info__stats animated-phase-one">
      <div class="stat">
        <div class="value">{{ certificate.MainStoneWeight }} ct.</div>
        <div class="label">Center Stone Weight</div>
      </div>
      <div class="stat">
        <div class="value">{{ certificate.MainStoneMeasurements }}</div>
        <div class="label">Center Stone Measurements</div>
      </div>
    </div>
    <div class="stat diagram">
      <!-- drop in your SVG icon here -->
    </div>
    <!-- Clarity / Symmetry / Polish gauges -->
    <div class="jewelry-info__quality">
      <div class="gauge animated-phase-two">
        <gauge
          :idPrefix="'1'"
          :value="certificate.MainStoneClarity.value"
          :percentage="percentages[certificate.MainStoneClarity.value]"
        />
        <div class="label">Clarity</div>
      </div>
      <div class="gauge animated-phase-three">
        <gauge
          :idPrefix="'2'"
          :value="certificate.MainStoneSymmetry"
          :percentage="percentages[certificate.MainStoneSymmetry]"
        />
        <div class="label">Symmetry</div>
      </div>
      <div class="gauge animated-phase-four">
        <gauge
          :idPrefix="'3'"
          :value="certificate.MainStonePolish"
          :percentage="percentages[certificate.MainStonePolish]"
        />
        <div class="label">Polish</div>
      </div>
    </div>

    <!-- Side‐stones summary -->
    <div class="jewelry-info__sides animated-phase-one">
      <div class="value">
        {{
          `${certificate.SideStoneWeight} | ${certificate.SideStoneColor.value} | ${certificate.SideStoneClarity.value}`
        }}
      </div>
      <div class="label">Sidestones / Color / Clarity</div>
    </div>
  </section>
</template>

<script setup>
import gauge from "../animations/gauge.vue";
import { usePercentages } from '../../composables/getGuagePercent';
const { percentages } = usePercentages();

defineProps({
  certificate: { type: Object, default: {} },
  ringNumber: { type: String, default: "2703662" },
  ringStyle: { type: String, default: "Round Brilliant" },
  centerStoneShape: { type: String, default: "Round Brilliant" },
  colorGrade: { type: String, default: "F" },
  colorPercent: { type: Number, default: 80 }, // 0–100
  centerStoneWeight: { type: String, default: "3.00 ct." },
  centerStoneMeasurements: { type: String, default: "9.27 × 9.33 × 5.67 mm" },
  clarity: { type: String, default: "VS1" },
  symmetry: { type: String, default: "EXCL" },
  polish: { type: String, default: "EXCL" },
  sideStones: { type: String, default: "0.25 | H-I | SI1-SI2" },
  comments: {
    type: String,
    default:
      "Diamond jewelry with 1 center round lab grown diamond and 24 round lab grown diamonds weighing approximately 3.25 ct. tw. in 14K Yellow Gold. Diamond weight estimated. Graded as mounting permits. Inscription LG708573043.",
  },
});
</script>

<style scoped>
.jewelry-info {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  color: #e1e8ed;
  padding: 2rem;
  border-radius: 0.75rem;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.jewelry-info__number {
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.jewelry-info__top {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.jewelry-info__item .label {
  font-size: 0.75rem;
  text-transform: uppercase;

  text-align: center;
}

.jewelry-info__item .value {
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.25rem;
  text-align: center;
}

.jewelry-info__color .label {
  font-size: 0.75rem;
  text-transform: uppercase;

  margin-top: 10px;
  text-align: center;
}

.slider {
  position: relative;
  height: 4px;
  background: #ffffff;
  border-radius: 2px;
  margin-top: 0.5rem;
}

.fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #287bc9;
  border-radius: 2px 0 0 2px;
}

/* DOWNWARD‑POINTING arrow sitting on top of the slider */
.thumb {
  position: absolute;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid #fff0;
  border-right: 6px solid #fff0;
  border-top: 8px solid #fff;
  margin-top: -16px;
}

/* label text above the arrow */
.thumb::after {
  content: attr(data-label);
  position: absolute;
  bottom: calc(20% + 8px + 4px); /* 8px arrow-height + 4px gap */
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: #fff;
  white-space: nowrap;
}

.jewelry-info__stats {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  flex-flow: column;
  align-items: center;
  gap: 10px;
  width: 14rem;
}

.stat {
  flex: 1;
  text-align: center;
}

.stat.diagram {
  flex: 0 0 60px; /* for your SVG icon */
}

.stat .value {
  font-size: 1rem;
  font-weight: 500;
}

.stat .label {
  font-size: 0.75rem;

  margin-top: 0.25rem;
}

.jewelry-info__quality {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.gauge {
  flex: 1;
  text-align: center;
}

.gauge .value {
  font-size: 1rem;
  font-weight: 500;
}

.gauge .label {
  font-size: 0.75rem;

  margin-top: 0.25rem;
}

.jewelry-info__sides {
  text-align: center;
  margin-bottom: 1.5rem;
}

.jewelry-info__sides .label {
  font-size: 0.75rem;
  text-transform: uppercase;

  margin-bottom: 0.25rem;
}

.jewelry-info__sides .value {
  font-size: 0.9rem;
}

.jewelry-info__comments {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.4;
}
</style>

