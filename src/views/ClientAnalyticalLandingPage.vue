<template>
  <section class="landing">
    <div class="logo">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/diamonds-8cf72.appspot.com/o/The_Diamond_Channel_Logo.webp?alt=media&token=6f765d6e-0ac5-470d-80e7-58937de17780"
        alt=""
        srcset=""
      />
    </div>
    <div style="width: 82%; padding: 1rem; text-align: center">
      <h3>Enter your email address to receive your certificate Via Email.</h3>
    </div>
    <form @submit.prevent="onSubmit" novalidate>
      <div class="field">
        <label for="fullName">Full Name</label>
        <input
          id="fullName"
          v-model.trim="form.fullName"
          :class="{ invalid: touched.fullName && !form.fullName }"
          type="text"
          autocomplete="name"
          required
        />
      </div>

      <div class="field">
        <label for="email">Your Email</label>
        <input
          id="email"
          v-model.trim="form.userEmail"
          :class="{
            invalid: touched.userEmail && !isValidEmail(form.userEmail),
          }"
          type="email"
          autocomplete="email"
          required
        />
      </div>

      <!-- <div class="field">
        <label for="link">Link to Send</label>
        <input
          id="link"
          v-model.trim="form.link"
          :class="{ invalid: touched.link && !isValidUrl(form.link) }"
          type="url"
          placeholder="https://example.com"
          required
        />
      </div> -->

      <button type="submit" :disabled="!isFormValid || loading">
        {{ loading ? "Sending…" : "Email Certificate" }}
      </button>

      <p v-if="message.text" :class="['msg', message.type]">
        {{ message.text }}
      </p>

      <p v-if="message.text" :class="['msg', message.type]">
        Redirecting you back in {{ redirectTimer }}
      </p>
    </form>
  </section>
</template>

<script>
import { functions } from "../config/firebaseInit";
const { DateTime } = require("luxon");

export default {
  name: "LandingSendLink",
  data() {
    return {
      sendEmail: functions.httpsCallable("sendEmail"),
      form: {
        fullName: "",
        userEmail: "",
      },
      touched: {
        fullName: false,
        userEmail: false,
      },
      loading: false,
      message: {
        type: "",
        text: "",
      },
      redirectTimer: 5,
    };
  },
  computed: {
    isFormValid() {
      return this.form.fullName && this.isValidEmail(this.form.userEmail);
    },
  },
  methods: {
    async sendAnalyticalDataToClient(data, certLink) {
      const currentDate = DateTime.now().toFormat("LLL dd yyyy");
      return await this.sendEmail({
        csv: null,
        message: `<!-- CLIENT EMAIL: The Diamond Channel – Notification -->
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <title>New Link Sent</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    @media (prefers-color-scheme: dark) {
      body, .wrapper { background-color: #0f1113 !important; color: #e8e9eb !important; }
      .card { background-color: #181b1f !important; border-color: #2a2f35 !important; }
      .badge { background:#2a2f35 !important; color:#e8e9eb !important; }
      .btn { background-color: #b8c6d9 !important; color: #0f1113 !important; }
      .muted, .footer { color: #b9bec4 !important; }
      .divider { background-color: #2a2f35 !important; }
      a { color: #c9d7ea !important; }
      .logo-text { color: #e8e9eb !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#f7f7f8; color:#222222;">
  <div role="article" aria-roledescription="email" lang="en">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      A user just requested a link—details inside.
    </div>

    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f7f7f8; width:100%;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:100%; max-width:600px;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 8px 0 20px;">
                <!-- If you have a logo image, swap this text block for an <img> -->
                 <div class="logo-text" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:18px; letter-spacing:1px; color:#1a1a1a;">
                   <img  src="https://firebasestorage.googleapis.com/v0/b/diamonds-8cf72.appspot.com/o/videos%2Fundefined%2FDIS_Logo_Short.png?alt=media&token=803267b6-3133-4b6f-bf90-3c7796f44917" alt="Diamond Services USA" />
                </div>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td class="card" style="background:#ffffff; border:1px solid #e8e8ea; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.04);">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding: 24px 28px 6px;">
                      <div class="badge" style="display:inline-block; padding:6px 10px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:11px; letter-spacing:0.3px; border-radius:999px; background:#eef1f6; color:#3a475a;">
                        New Link Sent
                      </div>
                      <h1 style="margin:10px 0 8px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:20px; font-weight:600; color:#1f1f1f;">
                        A user received a link
                      </h1>
                      <p style="margin:0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; line-height:1.7; color:#444;">
                        Here are the details captured from the landing page:
                      </p>
                    </td>
                  </tr>

                  <!-- Detail table -->
                  <tr>
                    <td style="padding: 8px 28px 4px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; color:#555; width:160px;">Full Name</td>
                          <td style="padding:10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; color:#111; font-weight:600;">${data.fullName}</td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; color:#555;">Email</td>
                          <td style="padding:10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; color:#111; font-weight:600;">
                            <a href="mailto:${data.userEmail}" style="color:#1f2937; text-decoration:none;">${data.userEmail}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; color:#555;">Link Sent</td>
                          <td style="padding:10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; color:#111; font-weight:600; word-break:break-all;">
                            <a href="${certLink}" style="color:#1f2937; text-decoration:none;">${certLink}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; color:#555;">Timestamp</td>
                          <td style="padding:10px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; color:#111; font-weight:600;">${currentDate}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- CTA -->
                  <tr>
                    <td align="center" style="padding: 16px 28px 22px;">
                      <a href="${certLink}"
                         class="btn"
                         style="display:inline-block; text-decoration:underline; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:14px; font-weight:600;  color:black; padding:10px 18px; border-radius:10px;">
                        View Link
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td style="height:1px; background:#eeeeef;" class="divider"></td>
                  </tr>

                  <tr>
                    <td style="padding: 16px 28px 24px;">
                      <p class="muted" style="margin:0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:12px; line-height:1.7; color:#7a7e85;">
                        This message was sent automatically from the landing page. Reply to contact the user directly.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" class="footer" style="padding: 18px 8px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:12px; color:#8a8f96;">
                © 2025 Diamond Services USA <a href="https://diamondservicesusa.com/" style="color:#5a6a85; text-decoration:none;">Diamond Services USA</a>
                <br>
                Questions? <a href="mailto:kelvin@diamondservicesusa.com" style="color:#5a6a85; text-decoration:none;">kelvin@diamondservicesusa.com</a>
              </td>
            </tr>
            <tr><td style="height:24px;"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

        `,
        to: [
          "kelvin@diamondservicesusa.com",
          "Edon.mesica@mydiamondchannel.com",
        ],
        filename: null,
        subject: "Digital Certificate Delivery Notification",
      });
    },
    async sendEmailLinkToUser(data) {
      let certLink = `https://certificates.diamondservicesusa.com/${
        this.$route.params.type
      }/${this.$route.params.certificate_num.trim()}`;

      await this.sendEmail({
        csv: null,
        message: `
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <title>Your Link from The Diamond Channel</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    /* Dark mode support (where supported) */
    @media (prefers-color-scheme: dark) {
      body, .wrapper { background-color: #0f1113 !important; color: #e8e9eb !important; }
      .card { background-color: #181b1f !important; border-color: #2a2f35 !important; }
      .btn { background-color: #b8c6d9 !important; color: #0f1113 !important; }
      .muted, .footer { color: #b9bec4 !important; }
      .divider { background-color: #2a2f35 !important; }
      a { color: #c9d7ea !important; }
      .logo-text { color: #e8e9eb !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#f7f7f8; color:#222222;">
  <div role="article" aria-roledescription="email" lang="en">
    <!-- Preheader (hidden) -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      Here’s your personal link—tap the button to view.
    </div>

    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f7f7f8; width:100%;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:100%; max-width:600px;">
            <!-- Header -->
            <tr>
               <div class="logo-text" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:18px; letter-spacing:1px; color:#1a1a1a;">
                  THE DIAMOND CHANNEL
                </div>
            </tr>

            <!-- Card -->
            <tr>
              <td class="card" style="background:#ffffff; border:1px solid #e8e8ea; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.04);">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding: 28px 28px 12px;">
                      <h1 style="margin:0 0 8px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:22px; font-weight:500; color:#1f1f1f; letter-spacing:0.2px;">
                        Hello ${data.fullName},
                      </h1>
                      <p style="margin:0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:15px; line-height:1.6; color:#444;">
                        Here’s the link you requested. Click the button below to open it instantly.
                      </p>
                    </td>
                  </tr>

                  <!-- CTA -->
                  <tr>
                    <td align="center" style="padding: 16px 28px 6px;">
                      <a href="${certLink}"
                         class="btn"
                         style="display:inline-block; text-decoration:underline; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:15px; font-weight:600;  color:black; padding:12px 20px; border-radius:10px;">
                        View Digital Certificate
                      </a>
                    </td>
                  </tr>

                  <!-- Plain link fallback -->
                  <tr>
                    <td style="padding: 6px 28px 22px;">
                      <p class="muted" style="margin:0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:12px; line-height:1.6; color:#777;">
                        Or copy & paste this into your browser:<br>
                        <a href="${certLink}" style="color:#1f2937; word-break:break-all;">${certLink}</a>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="height:1px; background:#eeeeef;" class="divider"></td>
                  </tr>

                  <!-- Footer copy -->
                  <tr>
                    <td style="padding: 18px 28px 26px;">
                      <p class="muted" style="margin:0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:12px; line-height:1.7; color:#7a7e85;">
                        If you didn’t request this, you can ignore this message.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" class="footer" style="padding: 18px 8px 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size:12px; color:#8a8f96;">
                © 2025 The Diamond Channel · <a href="https://mydiamondchannel.com/" style="color:#5a6a85; text-decoration:none;">The Diamond Channel</a>
                <br>
                Need help? <a href="mailto:info@diamondservicesusa.com" style="color:#5a6a85; text-decoration:none;">info@diamondservicesusa.com</a>
              </td>
            </tr>
            <tr><td style="height:24px;"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
`,
        to: [data.userEmail],
        filename: null,
        subject: "Digital Certificate Delivery",
      });

      return await this.sendAnalyticalDataToClient(data, certLink);
    },
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
    },

    async onSubmit() {
      this.touched.fullName = true;
      this.touched.userEmail = true;
      this.touched.link = true;
      this.message.type = "";
      this.message.text = "";

      if (!this.isFormValid || this.loading) return;

      this.loading = true;

      await this.sendEmailLinkToUser({
        fullName: this.form.fullName,
        userEmail: this.form.userEmail,
        link: this.form.link,
      });

      this.message.type = "success";
      this.message.text = "Link sent successfully and client notified.";

      this.form.fullName = "";
      this.form.userEmail = "";
      this.form.link = "";
      this.touched.fullName = false;
      this.touched.userEmail = false;
      this.touched.link = false;

      setInterval(() => {
        this.redirectTimer -= 1;
      }, 2000);
    },
  },
  watch: {
    redirectTimer(e) {
      if (!e) {
        window.location = `https://certificates.diamondservicesusa.com/${
          this.$route.params.type
        }/${this.$route.params.certificate_num.trim()}`;
      }
    },
  },
};
</script>

<style scoped>
.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 30px;
  padding: 0;
  right: 0;
}

.logo img {
  width: 200px;
}

.landing {
  width: 100%;
  color: #1a1a1a;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial,
    sans-serif;
  background: transparent;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 0 0 0.5rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* Field group spacing */
.field {
  margin: 1.25rem 0;
}

/* Labels appear above the underline, soft gray like the reference */
label {
  display: block;
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  color: #6b7280; /* neutral gray */
}

/* Inputs: no box border, just an underline */
input {
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #111;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #d1d5db; /* light gray underline */
  border-radius: 0;
  transition: border-color 160ms ease, color 160ms ease,
    background-color 160ms ease;
}

/* Focus state: darker underline, no outline */
input:focus {
  outline: none;
  border-bottom-color: #111;
}

/* Invalid state: red underline */
input.invalid {
  border-bottom-color: #b00020;
}

/* Submit button: large pill, black with uppercase text */
button {
  display: inline-block;
  width: 100%;
  padding: 1rem 1.25rem;
  background: #000;
  color: #fff;
  border: 0;
  border-radius: 9999px; /* full pill */
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: filter 150ms ease, transform 150ms ease, opacity 150ms ease;
}

/* Hover/active feedback (subtle, like the reference site) */
button:hover:not([disabled]) {
  filter: brightness(0.92);
}
button:active:not([disabled]) {
  transform: translateY(1px);
}

/* Disabled state */
button[disabled] {
  opacity: 0.55;
  cursor: not-allowed;
}

/* Messages */
.msg {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  text-align: left;
}
.msg.success {
  color: #0a7a3d;
}
.msg.error {
  color: #b00020;
}
</style>
