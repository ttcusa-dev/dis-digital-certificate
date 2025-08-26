<!-- components/RingInfoVariant.vue -->
<template>
  <section class="ring-info-v2 animated-phase-one">
    <!-- Style & Shape (stacked, centered) -->
    <div class="top">
      <div class="block">
        <div class="value">{{ certificate.JewelryType }}</div>
        <div class="label">STYLE</div>
      </div>
      <div class="block">
        <div class="value">{{ certificate.MainStoneShape }}</div>
        <div class="label">CENTER STONE SHAPE</div>
      </div>
    </div>


    <!-- Color slider -->
    <div class="color-slider">
      <colorbar :idPrefix="'1'" :color="certificate.MainStoneColor" />
    </div>

    <!-- Measurements & Weight -->
    <div class="stats">
      <div class="col">
        <div class="value">{{ certificate.MainStoneWeight }} ct.</div>
        <div class="label">CENTER STONE WEIGHT</div>
      </div>
    </div>

    <!-- Clarity gauge -->
    <div class="quality">
      <div class="gauge animated-phase-two">
        <gauge
          guageWidth="95px"
          :idPrefix="'1'"
          :value="certificate.MainStoneClarity.value"
        />
        <div class="label">Clarity</div>
      </div>
    </div>
    <hr class="divider" />

    <!-- Side‑stones summary -->
    <div class="sides">
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
  font-family: "Helvetica Neue", Arial, sans-serif;
}
.number {
  font-size: 1.2rem;

  margin-bottom: 1.5rem;
}
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.top .block .label {
  font-size: 12px;
  text-transform: uppercase;
}
.top .block .value {
  font-size: 16px;
  font-weight: 500;
}
.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
}
.color-slider {
  margin-bottom: 10px;
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
  font-size: 16px;
  font-weight: 500;
}
.stats .col .label {
  font-size: 13px;
  text-transform: uppercase;
  margin-top: 0.25rem;
}
.quality {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quality .label {
  font-size: 13px;
  text-transform: uppercase;
  margin-top: 0.5rem;
}
.sides {
  margin-bottom: 2rem;
}
.sides .value {
  font-size: 16px;
  font-weight: 500;
}
.sides .label {
  font-size: 13px;
  text-transform: uppercase;
  margin-top: 0.25rem;
  margin-bottom: 6rem;
}
</style>
