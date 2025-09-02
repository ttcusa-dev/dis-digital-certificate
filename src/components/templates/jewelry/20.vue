<template>
  <div class="product-info">
    <div class="specs-grid">
      <div class="spec-item">
        <div class="spec-value value">{{ props.certificate.JewelryType }}</div>
        <div class="spec-label label">STYLE</div>
      </div>
      <div class="spec-item">
        <div class="spec-value value">{{ props.certificate.Metal }}</div>
        <div class="spec-label">METAL</div>
      </div>
    </div>
  </div>

  <div class="primary-gem animated-phase-one">
    <div class="spec-label label">PRIMARY:GEM STONE</div>
    <div class="gem-content-layout">
      <div class="specs-container">
        <div class="size-info">
          <div class="specs-value value">
            {{ props.certificate.MainStoneMeasurements }}
          </div>
          <div class="specs-label">GEM SIZE</div>
        </div>
        <div
          class="gem-center"
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
            <div class="specs-value value"></div>
            <div class="specs-label"></div>
          </div>
          <div class="specs-divs">
            <div class="specs-value value"></div>
            <div class="specs-label"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="primary-gem animated-phase-one">
    <div class="spec-label label">SIDE STONE:GEM STONE</div>
    <div class="gem-content-layout">
      <div class="specs-container">
        <div class="size-info">
          <div class="specs-value value">
            {{ props.certificate.MainStoneMeasurements }}
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
            <div class="specs-value value"></div>
            <div class="specs-label"></div>
          </div>
          <div class="specs-divs">
            <div class="specs-value value"></div>
            <div class="specs-label"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Stones from "../../animations/Stones.vue";

const props = defineProps(["certificate"]);
</script>

<style>
</style>