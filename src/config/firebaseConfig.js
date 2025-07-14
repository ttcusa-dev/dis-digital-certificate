//PRODUCTION

let config = {
  PRODUCTION: {
    apiKey: process.env.VUE_APP_PRODUCTION_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_PRODUCTION_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_PRODUCTION_DATABASE_URL,
    projectId: process.env.VUE_APP_PRODUCTION_PROJECT_ID,
    storageBucket: process.env.VUE_APP_PRODUCTION_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_PRODUCTION_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_PRODUCTION_APP_ID,
    measurementId: process.env.VUE_APP_PRODUCTION_MEASUREMENT_ID,
  },
  STAGING: {
    apiKey: process.env.VUE_APP_STAGING_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_STAGING_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_STAGING_DATABASE_URL,
    projectId: process.env.VUE_APP_STAGING_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STAGING_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_STAGING_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_STAGING_APP_ID,
    measurementId: process.env.VUE_APP_STAGING_MEASUREMENT_ID,
  },
};

export default config[process.env.VUE_APP_MODE];
