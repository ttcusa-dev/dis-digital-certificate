<!-- components/RingStudsInfo.vue -->
<template>
  <section class="ring‑studs">
    <div class="value">{{ certificate.JewelryType }}</div>
    <div class="label">Style</div>
    <div class="style-row">
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <!-- two columns -->
    <div class="columns">
      <div
        v-for="(stone, i) in certificate.MultipleCenterStones"
        :key="i"
        class="col animated-phase-one"
      >
        <!-- index bubble -->
        <div class="index">{{ i + 1 }}</div>

        <!-- measurements -->
        <div class="value">{{ stone.MainStoneMeasurements }}</div>
        <div class="label">CENTER STONE MEASUREMENTS</div>

        <!-- shape -->
        <div class="value">{{ stone.MainStoneShape }}</div>
        <div class="label">CENTER STONE SHAPE</div>

        <!-- cut -->
        <div class="value">{{ stone.MainStoneCut }}</div>
        <div class="label">CUT</div>

        <!-- color slider -->
        <div class="color-wrapper">
          <colorbar
            fontSize="13px"
            maxWidth="170px"
            :idPrefix="`${i + 1}`"
            :color="stone.MainStoneColor"
          />
        </div>

        <!-- diagram + CTW / table / depth -->

        <!-- <div class="table-depth">
          <div>{{ stone.MainStoneTable }} <span class="small">TABLE</span></div>
          <div>{{ stone.MainStoneDepth }} <span class="small">DEPTH</span></div>
        </div> -->

        <!-- clarity & polish gauges (same as left side) -->
        <div class="gauges">
          <div class="gauge animated-phase-two">
            <gauge
              guageWidth="70px"
              :idPrefix="generateRandomID()"
              :value="stone.MainStoneClarity.value"
            />
            <div class="label">Clarity</div>
          </div>
          <div class="diagram">
            <div class="ctw">{{ stone.MainStoneWeight }} CTW</div>
            <img src="../../../assets/diagram.png" alt="" srcset="" />
          </div>
          <div class="gauge animated-phase-three">
            <gauge
              guageWidth="70px"
              :idPrefix="generateRandomID()"
              :value="stone.MainStoneSymmetry"
            />
            <div class="label">Symmetry</div>
          </div>
          <div class="gauge animated-phase-four">
            <gauge
              guageWidth="70px"
              :idPrefix="generateRandomID()"
              :value="stone.MainStonePolish"
            />
            <div class="label">Polish</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import colorbar from "../../animations/colorbar.vue";
import gauge from "../../animations/Gauge.vue";

defineProps({
  certificate: { type: Object, default: {} },
});

function generateRandomID() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
</script>

<style scoped>
.ring‑studs {
  color: #e1e8ed;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.75rem;
  text-align: center;
  overflow: hidden;
}
.ring‑number {
  opacity: 0.6;
  margin-bottom: 0.5rem;
}

/* 1) STYLE heading with lines */
.style-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.style-row .line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}
.style-row .style {
  padding: 0 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.6;
}

/* 2) Vertical divider */
.columns {
  position: relative;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.columns::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
}

/* optional: add a little breathing room on each side */
.col {
  flex: 1;
  padding: 0 0.5rem;
}
.index {
  width: 24px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  line-height: 24px;
  margin: 0 auto 0.25rem;
  opacity: 0.6;
}
.value {
  font-size: 13px;
  font-weight: 500;
}
.label {
  font-size: 9px;
}

.ctw {
  position: absolute;
  transform: translate(-39%, 17%);
  font-size: 10px;
  font-weight: 900;
  background-color: #414c62d6;
  padding: 3px;
  width: 34px;
  height: 29px;
  text-align: center;
  border-radius: 8px;
}
.table-depth {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  opacity: 0.6;
  margin-bottom: 1rem;
}
.small {
  display: block;
  font-size: 0.6rem;
  text-transform: uppercase;
}

.color-wrapper {
  margin-bottom: 10px;
}

.gauges {
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 12px;
}

.diagram {
  display: flex;
  justify-content: center;
  align-items: center;
}

.diagram img {
  width: 100%;
  height: 100%;
}

.label:nth-child(5),
.label:nth-child(3) {
  margin-top: 0.1rem !important;
}
</style>
