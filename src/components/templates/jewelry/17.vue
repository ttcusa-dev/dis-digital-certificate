<template>
  <section class="jewelry-info">
    <div class="product-info">
      <div class="specs-grid">
        <div class="spec-item">
          <div class="spec-value value">{{ certificate.JewelryType }}</div>
          <div class="spec-label label">STYLE</div>
        </div>
        <div class="spec-item">
          <div class="spec-value value">{{ certificate.Metal }}</div>
          <div class="spec-label">METAL</div>
        </div>
      </div>
    </div>
    <hr class="divider" />
    <div class="specs-container">
      <div
        class="gem-center"
        style="display: flex; flex-direction: column; align-items: center"
      >
        <stones
          :stoneShape="certificate.MainStoneShape"
          :stoneType="certificate.MainStoneType"
          :colorHex="certificate.MainStoneColorCode"
          :stoneColor="certificate.MainStoneColor.value"
          :maxWidth="'150px'"
        />
        <div class="gem-type">
          <div style="margin-top: 20px">
            <div class="specs-value value">
              {{ certificate.MainStoneMeasurements }}
            </div>
            <div class="specs-label">GEM SIZE</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Stones from "../../animations/Stones.vue";
defineProps(["certificate"]);
</script>

<style scoped>
.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-left: 1.5rem;
  width: 90%;
  margin-bottom: 1rem;
}

.jewelry-info {
  margin-top: 1rem;
}

.specs-container {
  height: 38vh;
}
</style>
