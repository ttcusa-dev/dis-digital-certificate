<!-- components/RingInfoVariant.vue -->
<template>
  <section class="ring-info-v2 animated-phase">
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
      <div class="slider">
        <div class="fill" :style="{ width: colorPercent + '%' }"></div>
        <div
          class="thumb"
          :style="{ left: colorPercent + '%' }"
          :data-label="colorGrade"
        ></div>
      </div>
      <div class="label">COLOR</div>
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
      <div class="clarity-gauge">
        <!-- insert your gauge component or SVG here -->
        <slot name="clarity-gauge"></slot>
      </div>
      <div class="label">CLARITY</div>
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
defineProps({
  certificate: { type: Object, default: {} },
  ringNumber: { type: String, default: "2703655" },
  styleValue: { type: String, default: "STYLE" },
  shapeValue: { type: String, default: "Radiant" },
  colorGrade: { type: String, default: "H" },
  colorPercent: { type: Number, default: 85 }, // 0–100
  measurements: { type: String, default: "7.46 × 6.05 × 4.03 MM" },
  weight: { type: String, default: "1.50" },
  sideStones: { type: String, default: "0.42 | H‑I | SI1‑SI2" },
  comments: {
    type: String,
    default:
      "Diamond Ring with 1 center radiant lab grown diamond and 82 round lab grown diamonds weighing approximately 1.92 ctw. in 14K WG. Inscription LG414099312. Diamond weight estimated. Graded as mounting permits.",
  },
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
