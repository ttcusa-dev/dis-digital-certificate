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

    <hr class="divider" />

    <!-- Color slider -->
    <div class="color-slider">
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
          :idPrefix="'1'"
          :value="certificate.MainStoneClarity.value"
          :percentage="percentages[certificate.MainStoneClarity.value]"
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
import colorbar from "../animations/colorbar.vue";
import gauge from "../animations/gauge.vue";
import { usePercentages } from "../../composables/getGuagePercent";
const { percentages } = usePercentages();

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
  padding: 2rem 1.5rem;
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
  font-size: 0.75rem;

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
.color-slider {
  margin-bottom: 1.5rem;
}
.slider {
  position: relative;
  height: 4px;
  background: #2c3742;
  border-radius: 2px;
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
.color-slider .label {
  font-size: 0.75rem;

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
  font-size: 1rem;
  font-weight: 500;
}
.stats .col .label {
  font-size: 0.75rem;

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
.quality .label {
  font-size: 0.75rem;

  text-transform: uppercase;
  margin-top: 0.5rem;
}
.sides {
  margin-bottom: 1.5rem;
}
.sides .value {
  font-size: 0.9rem;
  font-weight: 500;
}
.sides .label {
  font-size: 0.75rem;

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
</style>
