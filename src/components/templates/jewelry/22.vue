<template>
  <section class="jewelry-info">
    <div class="product-info">
      <div class="specs-grid">
        <div class="spec-item">
          <div class="spec-value">{{ props.certificate.JewelryType }}</div>
          <div class="spec-label">STYLE</div>
        </div>

        <div class="spec-item">
          <div class="spec-value">{{ props.certificate.Metal }}</div>
          <div class="spec-label">METAL</div>
        </div>
      </div>
    </div>
    <div class="spec-item">
      <div class="spec-value">{{ totalCaratWeight }}</div>
      <div class="spec-label">TOTAL CARAT WEIGHT</div>
    </div>

    <div class="primary-gem animated-phase-one">
      <div class="spec-label label">PRIMARY: DIAMOND(S)</div>

      <div class="diamond-section">
        <div class="specs-container">
          <div class="clarity-info">
            <div class="specs-value">
              {{ props.certificate.MainStoneClarity.value }}
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
            />
          </div>

          <div class="specs-info">
            <div class="specs-divs">
              <div class="specs-value">
                {{ props.certificate.MainStoneColor.value }}
              </div>
              <div class="specs-label">COLOR</div>
            </div>
            <div v-if="MainStoneWeight" class="specs-divs">
              <div class="specs-value">
                {{ MainStoneWeight.toFixed(2) }}
              </div>
              <div class="specs-label">WEIGHT</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="primary-gem animated-phase-one">
      <div class="spec-label label">SECONDARY: DIAMOND(S)</div>

      <div class="diamond-section">
        <div class="specs-container">
          <div class="clarity-info">
            <div class="specs-value">
              {{ props.certificate.SideStoneClarity.value }}
            </div>
            <div class="specs-label">CLARITY</div>
          </div>

          <div
            class="diamond-visual"
            style="display: flex; flex-direction: column; align-items: center"
          >
            <stones
              :stoneShape="certificate.SideStoneShape"
              :stoneType="certificate.SideStoneType"
              :colorCode="certificate.SideStoneColorCode"
              :stoneColor="certificate.SideStoneColor.value"
            />
          </div>

          <div class="specs-info">
            <div class="specs-divs">
              <div class="specs-value">
                {{ props.certificate.SideStoneColor.value }}
              </div>
              <div class="specs-label">COLOR</div>
            </div>
            <div v-if="SideStoneWeight" class="specs-divs">
              <div class="specs-value">
                {{ SideStoneWeight.toFixed(2) }}
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
import { computed } from "vue";
import Stones from "../../animations/Stones.vue";

const props = defineProps(["certificate"]);
const MainStoneWeight = computed(() => {
  let weight = parseFloat(props.certificate.MainStoneWeight);
  if (isNaN(weight)) {
    return 0;
  }
  return weight;
});

const SideStoneWeight = computed(() => {
  let weight = parseFloat(props.certificate.SideStoneWeight);
  if (isNaN(weight)) {
    return 0;
  }
  return weight;
});

const totalCaratWeight = computed(() => {
  let weight = MainStoneWeight.value + SideStoneWeight.value;
  return weight ? weight.toFixed(2) : "Diamond Accent";
});
</script>

<style scoped>
.jewelry-info {
  margin-top: 1rem;
}

.product-info {
  margin-bottom: 0.2rem;
}

.primary-gem {
  padding-top: 0 !important;
}
</style>
