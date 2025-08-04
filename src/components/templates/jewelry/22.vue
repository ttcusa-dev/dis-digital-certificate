<template>
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

  <div class="primary-gem secondary">
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
            :colorHex="certificate.MainStoneColorCode"
          />
        </div>

        <div class="specs-info">
          <div class="specs-divs">
            <div class="specs-value">
              {{ props.certificate.MainStoneColor.value }}
            </div>
            <div class="specs-label">COLOR</div>
          </div>
          <div v-if="props.certificate.MainStoneWeight" class="specs-divs">
            <div class="specs-value">
              {{ props.certificate.MainStoneWeight }}
            </div>
            <div class="specs-label">WEIGHT</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="primary-gem secondary">
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
            :colorHex="certificate.SideStoneColorCode"
          />
        </div>

        <div class="specs-info">
          <div class="specs-divs">
            <div class="specs-value">
              {{ props.certificate.SideStoneColor.value }}
            </div>
            <div class="specs-label">COLOR</div>
          </div>
          <div v-if="props.certificate.SideStoneWeight" class="specs-divs">
            <div class="specs-value">
              {{ props.certificate.SideStoneWeight }}
            </div>
            <div class="specs-label">WEIGHT</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Stones from "../../animations/Stones.vue";

const props = defineProps(["certificate"]);

const totalCaratWeight = computed(
  () => props.certificate.MainStoneWeight + props.certificate.SideStoneWeight
);
</script>

<style>
</style>