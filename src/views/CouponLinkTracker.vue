<template></template>

<script>
import {
  functions,
  db,
  getDoc,
  doc,
  fieldValue,
  updateDoc,
} from "../config/firebaseInit";
export default {
  async beforeRouteEnter(to, from, next) {
    const customerRef = await getDoc(
      doc(db, "coupon_customers", to.params.customerId)
    );
    let digitalCertificate = await getDoc(
      doc(db, "jewelry", to.params.productId)
    );
    digitalCertificate = digitalCertificate.data();
    let customerDoc = customerRef.data();
    customerRef.update({
      amount_shared: fieldValue.increment(1),
    });

    updateDoc(doc(db, "companies", to.params.clientId), {
      coupon_analytics: {
        amount_shared: fieldValue.increment(1),
      },
    });

    const clientId = to.params.clientId;
    const userDevice = customerDoc.userDevice;
    const productID = to.params.productId;
    const country = "United States";
    const userAction = "click";
    const locality = null;
    const viewingTime = null;
    const saveViewingTime = false;
    const certificateData = digitalCertificate;
    const handleAnalyticsPerCertificate = httpsCallable(
      functions,
      "analytics-handleAnalyticsPerClient"
    );

    try {
      let data = await handleAnalyticsPerCertificate({
        clientId,
        userDevice,
        productID,
        country,
        locality,
        viewingTime,
        saveViewingTime,
        userAction,
        certificateData,
      });
      console.log(data);
      next((vm) => {
        console.log(to);
        window.location = customerDoc.clientAdLink;
      });
    } catch (error) {
      console.log(error);
      next((vm) => {
        console.log(to);
        window.location = customerDoc.clientAdLink;
      });
    }
  },
};
</script>

<style>
</style>