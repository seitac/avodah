export const SEL = {
  header: {
    contact: {
      liId: 'comp-ihjax7ir4',
      linkCss: 'a[data-testid="linkElement"][href*="/contact-us"]',
      expectedUrl: /\/contact-us/i,
      expectedHeading: /contact/i,
    },

    logo: {
      css: 'header a[href="/"], header a[href="https://www.avodah.com/"], header a[data-testid="linkElement"][href="/"]',
      expectedUrl: /https?:\/\/[^/]+\/?$/i,
    },
  },


  contact: {
    formReady: { css: 'form :is([data-hsfc-id],[class*="hsfc-"])' },

    // step 1
    firstName: { css: 'input[autocomplete="given-name"], input[name$="/firstname"]' },
    lastName:  { css: 'input[autocomplete="family-name"], input[name$="/lastname"]' },
    email:     { css: 'input[type="email"], input[name$="/email"]' },
    company:   { css: 'input[autocomplete="organization"], input[name$="/company"]' },
    role:      { css: 'input[autocomplete="organization-title"], input[name*="role" i], input[name*="title" i]' },
    

    // Next
    nextBtn:   { css: 'button:has-text("Next"), button:has-text("Continue")' },
    submitBtn: { css: 'button[type="submit"], button:has-text("Submit"), button:has-text("Send")' },

    // Step 2
    phone:     { css: 'input[type="tel"], input[autocomplete="tel"], input[name$="/phone"]' },
    message:   { css: 'textarea, [data-hsfc-id="Textarea"] textarea' },
    website:   { css: 'input[name*="website" i]' },
  },

  home: {
    ctas: {
      exploreMed:     { roleBtn: { name: /^explore avodahmed$/i }, hrefHost: /avodahmed\.com/i },
      exploreConnect: { roleBtn: { name: /^explore avodahconnect$/i }, hrefHost: /avodahconnect\.com/i },
      learnMoreMed:     { roleBtn: { name: /^learn more$/i }, hrefHost: /avodahmed\.com/i },
      learnMoreConnect: { roleBtn: { name: /^learn more$/i }, hrefHost: /avodahconnect\.com/i },
    },
  },


  footer: {
    // ───────── COMPANY ─────────
    company: {
      ourTeam:       { css: 'footer a[href="https://www.avodah.com/leadership"]',               expectedUrl: /\/leadership$/i },
      joinOurTeam:   { css: 'footer a[href="https://www.avodah.com/join-us"]',                  expectedUrl: /\/join-us$/i },
      privacyPolicy: { css: 'footer a[href="https://www.avodah.com/privacy-policy"]',           expectedUrl: /\/privacy-policy$/i },
      advisory:      { css: 'footer a[href="https://www.avodah.com/advisory-council-members"]', expectedUrl: /\/advisory-council-members$/i },
    },

    // ───────── PRODUCTS (POPUP) ─────────
    products: {
      avodahMed:     { css: 'footer a[href*="avodahmed.com"]' },
      avodahConnect: { css: 'footer a[href*="avodahconnect.com"]' },
    },

    // ───────── RESOURCES (INTERN) ─────────
    resources: {
      faqs:      { css: 'footer a[href="https://www.avodah.com/faqs"]',     expectedUrl: /\/faqs$/i },
      resources: { css: 'footer a[href="https://www.avodah.com/resource"]', expectedUrl: /\/resource$/i },
      contactUs: { css: 'footer a[href="https://www.avodah.com/contact-us"]', expectedUrl: /\/contact-us$/i },
    },

    // ───────── SOCIAL (POPUP) ─────────
    social: {
      liAvodahInc:     { css: 'footer a[href="https://www.linkedin.com/company/avodah-inc/"]' },
      liAvodahMed:     { css: 'footer a[href="https://www.linkedin.com/company/avodahmed/"]' },
      liAvodahConnect: { css: 'footer a[href="https://www.linkedin.com/company/avodahconnect/"]' },

      fbAvodahInc: { css: 'footer a[href="https://www.facebook.com/avodahai/"]' },
      fbAvodahMed: { css: 'footer a[href="https://www.facebook.com/avodahmed/"]' },

      igAvodahInc:   { css: 'footer a[href="https://www.facebook.com/avodah"]' },   // Bad link, goes to a FB page!!
      igAvodahMed:     { css: 'footer a[href*="instagram.com/AVODAHMED/"]' },
    },
  },
} as const;
