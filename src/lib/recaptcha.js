const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const isRecaptchaEnabled = Boolean(siteKey);

export const loadRecaptcha = () =>
  new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve(window.grecaptcha);
      return;
    }

    const existingScript = document.querySelector("script[data-recaptcha-v3]");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.grecaptcha), {
        once: true,
      });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptchaV3 = "true";
    script.addEventListener("load", () => resolve(window.grecaptcha), { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });

export const getRecaptchaToken = async (action) => {
  if (!isRecaptchaEnabled || typeof window === "undefined") {
    return null;
  }

  const recaptcha = await loadRecaptcha();
  await new Promise((resolve) => recaptcha.ready(resolve));
  return recaptcha.execute(siteKey, { action });
};
