
<template>
  <section class="jewelry-info">
    <div class="jewelry-info__item animated-phase-one">
      <div class="value">{{ certificate.Shape }} {{ certificate.Cut }}</div>
      <div class="label">Shape & CUT</div>
    </div>

    <!-- Color slider -->
    <div class="animated-phase-two">
      <colorbar :idPrefix="'1'" :color="certificate.Color" />
    </div>
    <hr class="divider" />
    <!-- Weight / Measurements / Diagram -->
    <div class="jewelry-info__stats animated-phase-one">
      <div class="stats">
        <div class="stat">
          <div class="value">{{ certificate.Weight }} ct.</div>
          <div class="label">Carat Weight</div>
        </div>
        <div class="stat">
          <div class="value">{{ certificate.Measurements }}</div>
          <div class="label">Measurements</div>
        </div>
      </div>
    </div>
    <hr class="divider" />

    <!-- Clarity / Symmetry / Polish gauges -->
    <div class="jewelry-info__quality">
      <div class="gauge animated-phase-two">
        <gauge
          :idPrefix="'1'"
          :guageWidth="'90px'"
          :value="certificate.Clarity.value"
        />
        <div class="label">CLARITY</div>
      </div>
      <div class="gauge animated-phase-three">
        <gauge
          :idPrefix="'2'"
          :guageWidth="'90px'"
          :value="certificate.Symmetry"
        />
        <div class="label">SYMMETRY</div>
      </div>
      <div class="gauge animated-phase-four">
        <gauge
          :idPrefix="'3'"
          :guageWidth="'90px'"
          :value="certificate.Polish"
        />
        <div class="label">POLISH</div>
      </div>
      <div class="gauge animated-phase-four">
        <gauge
          :idPrefix="'4'"
          :guageWidth="'90px'"
          :value="certificate.Polish"
        />
        <div class="label">FLUORESCENCE</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import colorbar from "../../animations/colorbar.vue";
import gauge from "../../animations/gauge.vue";

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
  padding: 1rem;
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
}

.jewelry-info__item .label {
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.6;
  text-align: center;
}

.jewelry-info__item .value {
  font-size: 18px;
  font-weight: 500;
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
  justify-content: space-around;
  flex-flow: row;
  align-items: center;
  width: 100%;
}

.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0.5rem 0;
}

.diagram {
  width: 150px;
  height: 140px;
}

.diagram img {
  width: 100%;
  height: 100%;
}

.stat {
  flex: 1;
  text-align: center;
}

.stat.diagram {
  flex: 0 0 60px; /* for your SVG icon */
}

.stat .value {
  font-size: 18px;
  font-weight: 500;
}

.stat .label {
  font-size: 13px;
  opacity: 0.6;
  margin-top: 0.25rem;
  text-transform: uppercase;
}

.jewelry-info__quality {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.5rem;
  padding-top: 20px;
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

