<!-- components/RingInfoVariant.vue -->
<template>
  <section class="ring-info-v2">
    <!-- Style & Shape (stacked, centered) -->
    <div class="top animated-phase-one">
      <div class="block">
        <div class="value">{{ certificate.JewelryType }}</div>
        <div class="label">Style</div>
      </div>
      <div class="block animated-phase-one">
        <div class="value">{{ certificate.MainStoneShape }}</div>
        <div class="label">CENTER STONE SHAPE</div>
      </div>
    </div>

    <hr class="divider" />

    <!-- Color slider -->
    <div class="color-slider">
      <colorbar :idPrefix="'1'" :color="certificate.MainStoneColor" />
    </div>

    <!-- Measurements & Weight -->
    <div class="stats animated-phase-one">
      <div class="col">
        <div class="value">{{ certificate.MainStoneMeasurements }}</div>
        <div class="label">MEASUREMENTS</div>
      </div>
      <div class="col">
        <div class="value">{{ certificate.MainStoneWeight }} ct.</div>
        <div class="label">CENTER STONE WEIGHT</div>
      </div>
    </div>

    <hr class="divider" />

    <!-- Clarity gauge -->
    <div class="gauge animated-phase-two">
      <gauge
        :idPrefix="'1'"
        :value="certificate.MainStoneClarity.value"
        :guageWidth="'80px'"
      />
      <div class="label">CLARITY</div>
    </div>

    <hr class="divider" />

    <!-- Side‑stones summary -->
    <div class="sides animated-phase-one">
      <div class="value">
        {{
          `${certificate.SideStoneWeight} | ${certificate.SideStoneColor.value} | ${certificate.SideStoneClarity.value}`
        }}
      </div>
      <div class="label">SIDESTONES / COLOR / CLARITY</div>
    </div>
  </section>
</template>

<script setup>
import colorbar from "../../animations/colorbar.vue";
import gauge from "../../animations/Gauge.vue";
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
  /* padding: 2rem 1.5rem; */
  text-align: center;
  
}
.number {
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
}
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.top .block .label {
  font-size: 13px;
  opacity: 0.8;
  text-transform: uppercase;
}
.top .block .value {
  font-size: 15px;
  font-weight: 500;
}
.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 5px;
  margin-bottom: 10px;
}
.color-slider {
  margin-bottom: 1.5rem;
}
.slider {
  position: relative;
  height: 4px;
  background: #2c3742;
  border-radius: 2px;
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

.color-slider .label {
  font-size: 13px;
  opacity: 0.8;
  text-transform: uppercase;
  margin-top: 0.5rem;
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
  font-size: 15px;
  font-weight: 500;
}
.stats .col .label {
  font-size: 13px;
  opacity: 0.8;
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
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.8;
  text-align: center;
} */
.sides {
  /* margin-bottom: 1.5rem; */
}
.sides .value {
  font-size: 15px;
  font-weight: 500;
}
.sides .label {
  font-size: 13px;
  opacity: 0.8;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

.label {
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.8;
  text-align: center;
}
</style>
