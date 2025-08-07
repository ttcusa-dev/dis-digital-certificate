<template>
  <div class="product-info animated-phase">
    <div class="specs-grid">
      <div class="spec-item">
        <div class="spec-value">{{ certificate.JewelryType }}</div>
        <div class="spec-label">STYLE</div>
      </div>
      <div class="spec-item">
        <div class="spec-value">{{ certificate.Metal }}</div>
        <div class="spec-label">METAL</div>
      </div>
    </div>
  </div>

  <div class="primary-gem secondary animated-phase">
    <div class="spec-label">PRIMARY:: DIAMOND(S)</div>

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
            :colorHex="certificate.MainStoneColorCode"
          />
        </div>

        <div class="specs-info">
          <div class="specs-divs">
            <div class="specs-value">
              {{ certificate.MainStoneColor.value }}
            </div>
            <div class="specs-label">COLOR</div>
          </div>
          <div class="specs-divs">
            <div class="specs-value">
              {{ certificate.MainStoneWeight }}
            </div>
            <div class="specs-label">WEIGHT</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="primary-gem animated-phase-one">
    <div class="spec-label">SECONDARY:: GEM STONE</div>
    <div class="gem-content-layout">
      <div class="specs-container">
        <div class="size-info">
          <div class="specs-value">
            {{ certificate.SideStoneMeasurements }}
          </div>
          <div class="specs-label">GEM SIZE</div>
        </div>
        <div
          class="gem-center"
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
            <div class="specs-value"></div>
            <div class="specs-label"></div>
          </div>
          <div class="specs-divs">
            <div class="specs-value"></div>
            <div class="specs-label"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Stones from "../../animations/Stones.vue";
defineProps({ certificate: { type: Object, default: {} } });
</script>

<style>
</style>