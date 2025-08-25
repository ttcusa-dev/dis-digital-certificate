<template>
  <div
    v-if="hasPerfections && imperfection.display_imperfection_icons"
    class="imperfection_img"
  >
    <img
      class="img"
      :src="imperfection.url"
      alt="Imperfection Template"
      ref="characteristics_url"
    />
    <div class="imperfections_key_holder">
      <p class="imperfection_chosen_text section_two_section_head">
        Key to Symbols
      </p>

      <div
        v-if="
          imperfection.imperfectionAddedList &&
          imperfection.imperfectionAddedList.length
        "
        class="key_info_holder"
      >
        <template>
          <div
            class="imperfections_key"
            v-for="(imperfection, index) in imperfection.imperfectionAddedList"
            :key="index"
          >
            <img
              ref="imperfection_url"
              class="imperfection_img_icon"
              :src="require('@/assets/imperfections/' + imperfection.image)"
              alt="imperfection"
            />
            <p class="imperfections_key_text">{{ imperfection.name }}</p>
          </div>
        </template>
        <div
          v-if="!imperfection.display_imperfection_icons"
          class="imperfections_key_noicon"
        >
          <p>
            Red Symbols indicate internal characteristics. <br />
            Green symbols indicate external characteristics
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imperfection: { type: Object, default: {} },
  hasPerfections: { type: Boolean, default: false },
});
</script>

<style>


</style>