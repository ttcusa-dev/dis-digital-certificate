<template></template>

<script>
const BASE_URL = "https://us-central1-diamonds-8cf72.cloudfunctions.net/digitalCertificateApi";

export default {
  async beforeRouteEnter(to, from, next) {
    // Build query for the API
    const qs = new URLSearchParams({
      customerId: to.params.customerId,
      productId: to.params.productId,
      clientId: to.params.clientId,
    });

    try {
      // JSON mode: get clientAdLink, then redirect
      const res = await fetch(`${BASE_URL}-handleCouponShare?${qs.toString()}`, {
        method: "GET",
      });
      const data = await res.json();

      const target = data?.clientAdLink || "https://diamondservicesusa.com";
      next(() => {
        window.location = target;
      });
    } catch (err) {
      console.error("handleCouponShare failed:", err);
      next(() => {
        window.location = "https://diamondservicesusa.com";
      });
    }
  },
};
</script>

<style>
</style>
