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

    <div class="primary-gem animated-phase-one">
      <div class="diamond-section">
        <div class="specs-container">
          <div class="clarity-info">
            <div class="specs-value">
              {{ certificate.MainStoneClarity.value }}
            </div>
            <div class="specs-label">CLARITY</div>
          </div>

          <div
            class="diamond-visual"
            style="display: flex; flex-direction: column; align-items: center"
          >
            <stones
              :stoneShape="certificate.MainStoneShape"
              :stoneType="certificate.MainStoneType"
              :colorCode="certificate.MainStoneColorCode"
              :stoneColor="certificate.MainStoneColor.value"
              :maxWidth="'200px'"
            />
          </div>

          <div class="specs-info">
            <div class="specs-divs">
              <div class="specs-value">
                {{ certificate.MainStoneColor.value }}
              </div>
              <div class="specs-label">COLOR</div>
            </div>
            <div v-if="certificate.MainStoneWeight" class="specs-divs">
              <div class="specs-value">
                {{ certificate.MainStoneWeight }}
              </div>
              <div class="specs-label">WEIGHT</div>
            </div>
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
}

.jewelry-info {
  margin-top: 1.5rem;
}

.specs-container {
  height: 38vh;
}
</style>
