
<template>
  <section class="jewelry-info">
    <div class="jewelry-info__top animated-phase-one">
      <div class="jewelry-info__item">
        <div class="value">{{ certificate.Shape }}</div>
        <div class="label">Shape</div>
      </div>

      <div v-if="certificate.Cut" class="jewelry-info__item">
        <div class="value">{{ certificate.Cut }}</div>
        <div class="label">Cut</div>
      </div>
    </div>

    <!-- Color slider -->
    <div class="jewelry-info__color animated-phase-one">
      <colorbar :idPrefix="'1'" :color="certificate.Color" />
    </div>

    <!-- Weight / Measurements / Diagram -->
    <hr class="divider" />
    <div class="jewelry-info__stats animated-phase-one">
      <div class="stat">
        <div class="value">{{ certificate.Weight }} </div>
        <div class="label">Carat</div>
      </div>
      <div class="stat">
        <div class="value">{{ certificate.Measurements }}</div>
        <div class="label">Measurements</div>
      </div>
      <div v-if="hasImperfection" class="stat">
        <button class="text-btn" @click="emits('view-imperfections')">
          View Imperfections
        </button>
      </div>
    </div>
    <hr class="divider" />
    <div class="stat diagram">
      <!-- drop in your SVG icon here -->
    </div>
    <!-- Clarity / Symmetry / Polish gauges -->
    <div class="jewelry-info__quality">
      <div class="gauge animated-phase-two">
        <gauge
          :idPrefix="'1'"
          :value="certificate.Clarity.value"
          :guageWidth="'80px'"
        />
        <div class="label">Clarity</div>
      </div>
      <div class="gauge animated-phase-three">
        <gauge
          :idPrefix="'2'"
          :value="certificate.Symmetry"
          :guageWidth="'80px'"
        />
        <div class="label">Symmetry</div>
      </div>
      <div class="gauge animated-phase-four">
        <gauge
          :idPrefix="'3'"
          :value="certificate.Polish"
          :guageWidth="'80px'"
        />
        <div class="label">Polish</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import colorbar from "../../animations/colorbar.vue";
import gauge from "../../animations/Gauge.vue";
const emits = defineEmits("view-imperfections");
defineProps({
  certificate: { type: Object, default: {} },
  hasImperfection: { type: Boolean, default: false },
});
</script>

<style scoped>
.jewelry-info {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  color: #e1e8ed;
  border-radius: 0.75rem;
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
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.jewelry-info__item .label {
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.8;
  text-align: center;
}

.jewelry-info__item .value {
  font-size: 18px;
  font-weight: 500;
  margin-top: 0.25rem;
  text-align: center;
}



.jewelry-info__stats {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  flex-flow: column;
  align-items: center;
  gap: 10px;
  width: 100%;
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
  text-transform: uppercase;
  opacity: 0.8;
}

.jewelry-info__quality {
  display: flex;
  justify-content: space-between;
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
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.8;
  margin-top: 0.25rem;
}

.jewelry-info__sides {
  text-align: center;
  margin-bottom: 1.5rem;
}

.jewelry-info__sides .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.8;
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

.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 5px;
  margin-bottom: 30px;
}
</style>

