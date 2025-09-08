<!-- components/RingInfoVariant.vue -->
<template>
  <section class="ring-info-v2">
    <!-- Style & Shape (stacked, centered) -->
    <div class="top animated-phase-one">
      <div class="block">
        <div class="value">{{ certificate.JewelryType }}</div>
        <div class="label">Style</div>
      </div>

      <div class="block">
        <div class="value">{{ certificate.MainStoneShape }}</div>
        <div class="label">Shape</div>
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
        <div class="gauge animated-phase-two">
          <gauge
            :idPrefix="'1'"
            :value="certificate.MainStoneClarity.value"
            guageWidth="100px"
          />
          <div class="label">CLARITY</div>
        </div>
      </div>
      <div class="animated-phase-two">
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
  max-width: 100%;
  overflow: hidden;
  width: 100%;
  color: #e1e8ed;
  padding-top: 0.8rem;
  text-align: center;
  height: 45vh;
  display: grid;
  flex-direction: column;
  justify-content: center;
}
.number {
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
}
.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  margin-top: 10px;
}
.top .block .label {
  font-size: 0.75rem;
  opacity: 0.8;
  text-transform: uppercase;
}
.top .block .value {
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
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

.gauges {
  width: 150px;
  display: grid;
  justify-content: center;
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
  opacity: 0.8;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.8;
  text-align: center;
}

/* @media (max-width: 480px) {
  .ring-info-v2 {
    padding: 1rem;
    padding-top: 1rem;
    height: fit-content !important
  }
} */
</style>
