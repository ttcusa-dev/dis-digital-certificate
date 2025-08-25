<template></template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(to);
      window.location = to.params.to;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>