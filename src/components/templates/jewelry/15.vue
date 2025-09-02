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

  <div class="primary-gem animated-phase-one">
    <div class="spec-label label">PRIMARY:GEM STONE</div>
    <div class="gem-content-layout">
      <div class="specs-container">
        <div v-if="props.certificate.MainStoneMeasurements" class="size-info">
          <div class="specs-value value">
            {{ props.certificate.MainStoneMeasurements }}
          </div>
          <div class="specs-label label">GEM SIZE</div>
        </div>

        <div v-else-if="props.certificate.MainStoneWeight" class="size-info">
          <div class="specs-value value">
            {{ props.certificate.MainStoneWeight }}
          </div>
          <div class="specs-label label">GEM WEIGHT</div>
        </div>

        <div
          class="gem-center"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <stones
            :stoneShape="certificate.MainStoneShape"
            :stoneType="certificate.MainStoneType"
            :colorHex="certificate.MainStoneColorCode"
            :colorMode="certificate.MainStoneColorMode"
            :maxWidth="'115px'"
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

  <div class="primary-gem animated-phase-one">
    <div class="spec-label label">SECONDARY DIAMOND(S)</div>

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
            :colorMode="certificate.SideStoneColorMode"
            :maxWidth="'115px'"
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
import Stones from "../../animations/Stones.vue";
const props = defineProps(["certificate"]);
</script>

<style scoped>

</style>