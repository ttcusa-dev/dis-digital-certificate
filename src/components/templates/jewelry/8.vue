
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
    <div class="jewelry-info__color animated-phase-one">
      <colorbar :idPrefix="'1'" :color="certificate.MainStoneColor" />
    </div>

    <!-- Weight / Measurements / Diagram -->
    <div class="jewelry-info__stats animated-phase-one">
      <div class="stats">
        <div class="stat">
          <div class="value">{{ certificate.MainStoneWeight }} ct.</div>
          <div class="label">Center Stone Weight</div>
        </div>
        <div class="stat">
          <div class="value">{{ certificate.MainStoneMeasurements }}</div>
          <div class="label">Center Stone Measurements</div>
        </div>
      </div>
      <div class="diagram">
        <table-depth
          :depth="certificate.MainStoneDepth"
          :table="certificate.MainStoneTable"
        />
      </div>
    </div>

    <!-- Clarity / Symmetry / Polish gauges -->
    <div class="jewelry-info__quality">
      <div class="gauge animated-phase-two">
        <gauge
          guageWidth="100px"
          :idPrefix="'1'"
          :value="certificate.MainStoneClarity.value"
        />
        <div class="label">Clarity</div>
      </div>
      <div class="gauge animated-phase-three">
        <gauge
          guageWidth="100px"
          :idPrefix="'2'"
          :value="certificate.MainStoneSymmetry"
        />
        <div class="label">Symmetry</div>
      </div>
      <div class="gauge animated-phase-four">
        <gauge
          guageWidth="100px"
          :idPrefix="'3'"
          :value="certificate.MainStonePolish"
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
import colorbar from "../../animations/colorbar.vue";
import gauge from "../../animations/Gauge.vue";
import TableDepth from "../../animations/TableDepth.vue";

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
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  border-radius: 0.75rem;
  /*  */
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
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
}

.jewelry-info__item .label {
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.8;
  text-align: center;
}

.jewelry-info__item .value {
  font-size: 14px;
  font-weight: 500;
  margin-top: 0.25rem;
  text-align: center;
}

.jewelry-info__color .label {
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.8;
  margin-top: 10px;
  text-align: center;
}

.jewelry-info__stats {
  display: flex;
  justify-content: space-around;
  flex-flow: row;
  align-items: center;
  width: 100%;
  margin-bottom: 0.2rem;
  border: none;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat {
  flex: 1;
  text-align: center;
}

.stat.diagram {
  flex: 0 0 60px; /* for your SVG icon */
}

.stat .value {
  font-size: 14px;
  font-weight: 500;
}

.stat .label {
  font-size: 12px;
  opacity: 0.8;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

.stat:nth-child(1) {
  border: none;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.jewelry-info__quality {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  border: none;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  font-size: 13px;
  font-weight: 500;
}

.gauge .label {
  font-size: 14px;
  opacity: 0.8;
  margin-top: 0.25rem;
  text-transform: uppercase;
}

.jewelry-info__sides {
  text-align: center;
  margin-bottom: 1.5rem;
}

.jewelry-info__sides .label {
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.jewelry-info__sides .value {
  font-size: 14px;
}
</style>

