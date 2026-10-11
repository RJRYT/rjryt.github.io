const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const isAnalyticsEnabled = Boolean(
  measurementId && /^G-[A-Z0-9]+$/i.test(measurementId),
);

export const trackEvent = (name, parameters = {}) => {
  if (!isAnalyticsEnabled || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", name, parameters);
};

export const trackPageView = ({ pathname, search }) => {
  trackEvent("page_view", {
    page_location: window.location.href,
    page_path: `${pathname}${search}`,
    page_title: document.title,
  });
};

export const loadAnalytics = () => {
  if (!isAnalyticsEnabled || typeof window === "undefined" || window.gtag) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
};
