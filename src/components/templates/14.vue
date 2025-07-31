
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
    <div class="jewelry-info__color">
      <colorbar
        :idPrefix="'1'"
        :value="certificate.MainStoneColor.value"
        :percentage="
          percentages[certificate.MainStoneColor.template][
            certificate.MainStoneColor.value
          ]
        "
      />
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

      <div class="stat diagram">
        <div v-if="certificate.MainStoneWeight != 0" class="value">
          {{ certificate.MainStoneWeight }}
        </div>
        <div class="label">{{ certificate.MainStoneType }}</div>
        <!-- drop in your SVG icon here -->
      </div>
    </div>
  </section>
</template>

<script setup>
import colorbar from "../animations/colorbar.vue";
import gauge from "../animations/gauge.vue";
import { usePercentages } from "../../composables/getGuagePercent";
const { percentages } = usePercentages();

defineProps({
  certificate: { type: Object, default: {} },
 
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
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-left: 5rem;
  padding-right: 5rem;
  width: 100%;
}

.jewelry-info__item .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.6;
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
  opacity: 0.6;
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
  opacity: 0.6;
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
  opacity: 0.6;
  margin-top: 0.25rem;
}

.jewelry-info__sides {
  text-align: center;
  margin-bottom: 1.5rem;
}

.jewelry-info__sides .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.6;
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

