<template>
  <div
    v-if="isVisible"
    class="modal-overlay"
    @click.self="emits('close-modal')"
  >
    <div class="modal">
      <button class="close-button" @click="emits('close-modal')">×</button>
      <div v-if="logo" class="modal-header">
        <div class="logo-wrapper">
          <img class="logo" :src="logo" alt="" />
        </div>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <!-- <div class="modal-footer">
        <button @click="closeModal">Close</button>
      </div> -->
    </div>
  </div>
</template>
  
<script setup>
defineProps({
  isVisible: { type: Boolean, required: true },
  logo: {
    type: String,
    default: null,
  },
});
const emits = defineEmits(["close-modal"]);
</script>
  
<style scoped>
.logo {
  width: 200px;
  filter: invert(1);
}

.logo-wrapper {
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;

  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  padding: 20px;
}
.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.close-button {
  border: none;
  position: inherit;
  background: none;
  font-size: 34px;
  cursor: pointer;
  color: red;
  margin-left: 97%;
  margin-top: -24px;
  display: block;
}
.modal-body {
  margin: 20px 0;
}
.modal-footer {
  text-align: right;
}
</style>
  