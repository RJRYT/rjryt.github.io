import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadAnalytics, trackEvent, trackPageView } from "@/lib/analytics";

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    loadAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location);
  }, [location]);

  useEffect(() => {
    const trackOutboundClick = (event) => {
      const link = event.target.closest("a[href]");
      if (!link || link.href.startsWith(window.location.origin)) {
        return;
      }

      trackEvent("outbound_click", {
        link_domain: new URL(link.href).hostname,
        link_text: link.textContent.trim().slice(0, 100),
      });
    };

    document.addEventListener("click", trackOutboundClick);
    return () => document.removeEventListener("click", trackOutboundClick);
  }, []);

  return null;
};

export default Analytics;
