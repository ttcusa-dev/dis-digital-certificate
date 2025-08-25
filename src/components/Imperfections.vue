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
    <div
      v-if="
        imperfection.imperfectionAddedList &&
        imperfection.imperfectionAddedList.length
      "
      class="imperfections_key_holder"
    >
      <p class="imperfection_chosen_text section_two_section_head">
        Key to Symbols
      </p>

      <div class="key_info_holder">
        <div
          class="imperfections_key"
          v-for="(list, index) in imperfection.imperfectionAddedList"
          :key="index"
        >
          <img
            ref="imperfection_url"
            class="imperfection_img_icon"
            :src="fetchImperfection(list.image)"
            alt="imperfection"
          />
          <p class="imperfections_key_text">{{ list.name }}</p>
        </div>
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
const props = defineProps({
  imperfection: { type: Object, default: {} },
  hasPerfections: { type: Boolean, default: false },
});

function fetchImperfection(imagePath) {
  let filePath = `../assets/imperfections/${imagePath}`;
  return new URL(filePath, import.meta.url).href;
}
</script>

<style lang="scss" scoped>
.imperfections_key_text {
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
}
.imperfection_img {
  // position: absolute;
  width: 100%;
  top: 50em;

  .img {
    // background: #2b2b2b;
    width: 100%;
    z-index: 2;
    position: relative;
    // left: 2px;
  }

  .img_background {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
    filter: none;
  }

  .imperfections_key_holder {
    margin-left: 0;
    padding-left: 15px;
    color: black;
    padding-left: 5%;
    padding-bottom: 2%;
  }

  .imperfection_chosen_text {
    margin-left: 0;
    font-size: 18px;
    width: 100%;
    margin-top: 0;
    margin-bottom: 5px;
  }

  .key_info_holder {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    .imperfections_key {
      margin: 0;
      width: auto;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      margin-right: 10px;
      margin-bottom: 5px;

      p {
        font-size: 18px;
        margin: 0;
      }

      img {
        height: 20px;
        margin-left: 3px;
        filter: invert(1);
      }
    }
  }
}
</style>