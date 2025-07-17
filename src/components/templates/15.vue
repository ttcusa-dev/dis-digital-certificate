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

  <div class="primary-gem">
    <div class="spec-label">PRIMARY:GEM STONE</div>
    <div class="gem-content-layout">
      <div class="specs-container">
        <div class="size-info">
          <div class="specs-value">
            {{ props.certificate.MainStoneMeasurements }}
          </div>
          <div class="specs-label">GEM SIZE</div>
        </div>
        <div
          class="gem-center"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <img
            src="../../assets/images/emerlad.svg"
            class="gem-image"
            alt="Emerald"
          />
          <div class="gem-type">
            <div>{{ props.certificate.MainStoneType }}</div>
            <div class="round">({{ props.certificate.MainStoneShape }})</div>
          </div>
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

  <div class="primary-gem secondary">
    <div class="spec-label">SECONDARY DIAMOND(S)</div>

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
          <img
            src="../../assets/images/labground.svg"
            class="gem-image"
            alt="Diamond"
          />
          <div class="gem-type" style="width: fit-content">
            <div style="width: 203px; font-size: 12px">
              {{ props.certificate.SideStoneType }}
            </div>
            <div style="width: 200px; font-size: 12px" class="round">
              ( {{ props.certificate.SideStoneShape }})
            </div>
          </div>
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
const props = defineProps(["certificate"]);
</script>

<style>
</style>