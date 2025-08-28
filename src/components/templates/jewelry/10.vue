<!-- components/RingInfoVariant.vue -->
<template>
  <section class="ring-info-v2">
    <!-- Style & Shape (stacked, centered) -->
    <div class="top animated-phase-one">
      <div class="block">
        <div class="value">{{ certificate.JewelryType }}</div>
        <div class="label">Style</div>
      </div>
    </div>

    <hr class="divider" />

    <!-- Color slider -->
    <div class="color-slider">
      <colorbar :idPrefix="'1'" :color="certificate.MainStoneColor" />
    </div>

    <!-- Measurements & Weight -->

    <!-- Clarity gauge -->
    <div class="info-section">
      <div class="gauges">
        <div class="guage animated-phase-two">
          <gauge
            :idPrefix="'1'"
            :value="certificate.MainStoneClarity.value"
            guageWidth="80px"
          />
          <div class="label">CLARITY</div>
        </div>
        <div class="guage animated-phase-two">
          <gauge
            :idPrefix="'2'"
            :value="certificate.MainStoneClarity2?.value"
            guageWidth="80px"
          />
          <div class="label">CLARITY 2</div>
        </div>
      </div>
      <div class="animated-phase-two" style="margin-top: 20px;">
        <Wireframe
          :weight="certificate.MainStoneWeight"
          :jewelryShape="certificate.MainStoneShape"
          :jewelryType="certificate.JewelryType"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import colorbar from "../../animations/colorbar.vue";
import gauge from "../../animations/Gauge.vue";
import Wireframe from "../../animations/Wireframe.vue";


defineProps({
  certificate: { type: Object, default: {} },
});
</script>

<style scoped>
.ring-info-v2 {
  max-width: 380px;
  overflow: hidden;
  width: 100%;
  margin: auto;
  color: #e1e8ed;
  padding-top: 0.8rem;
  text-align: center;
  font-family: "Helvetica Neue", Arial, sans-serif;
  height: 50vh;
}
.number {
  font-size: 1.2rem;
  opacity: 0.6;
  margin-bottom: 1.5rem;
}
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.top .block .label {
  font-size: 0.75rem;
  opacity: 0.6;
  text-transform: uppercase;
}
.top .block .value {
  font-size: 1rem;
  font-weight: 500;
}
.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
}

.info-section {
  width: 100%;
  position: relative;
  display: flex;
  margin-top: 30px;
}
.slider {
  position: relative;
  height: 4px;
  background: #2c3742;
  border-radius: 2px;
}

.gauges {
  width: 150px;
  display: grid;
  justify-content: center;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  gap: 1rem;
}
.gauge {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.wireframe {
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.wireframe img {
  width: 100%;
  height: 88%;
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
  font-size: 0.75rem;
  color: #fff;
  white-space: nowrap;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.stats .col {
  flex: 1;
}
.stats .col .value {
  font-size: 1rem;
  font-weight: 500;
}
.stats .col .label {
  font-size: 0.75rem;
  opacity: 0.6;
  text-transform: uppercase;
  margin-top: 0.25rem;
}
.quality {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}
.clarity-gauge ::v-deep(*) {
  width: 80px;
  height: 80px;
}
/* .quality .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.6;
  text-align: center;
} */
.sides {
  margin-bottom: 1.5rem;
}
.sides .value {
  font-size: 0.9rem;
  font-weight: 500;
}
.sides .label {
  font-size: 0.75rem;
  opacity: 0.6;
  text-transform: uppercase;
  margin-top: 0.25rem;
}
.comments {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.4;
  text-align: left;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.6;
  text-align: center;
}
</style>
