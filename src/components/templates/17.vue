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
  <hr class="divider" />
  <div class="specs-container">
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
        <div class="value">{{ props.certificate.MainStoneType }}</div>
        <div class="round label">({{ props.certificate.MainStoneShape }})</div>
        <div style="margin-top: 20px">
          <div class="specs-value value">
            {{ props.certificate.MainStoneMeasurements }}
          </div>
          <div class="specs-label">GEM SIZE</div>
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