import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  ExternalLink,
  Globe2,
  Home,
  Link2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { performRedirect, getLinkInfoById } from "@/utils/redirects";
import { Button } from "@/components/ui/button";

const RedirectPage = () => {
  const { key } = useParams();
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!key) {
      setError("Invalid redirect key");
      return;
    }

    try {
      const targetUrl = performRedirect(key);
      const { title, description } = getLinkInfoById(key);
      setRedirect({
        key,
        targetUrl,
        title: `Redirecting to ${new URL(targetUrl).hostname}`,
        description: "You will be redirected automatically in a few seconds.",
        linkInfo: { title, description },
      });
    } catch (err) {
      setError(err.message);
    }
  }, [key]);

  useEffect(() => {
    if (redirect && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (redirect && countdown === 0) {
      handleRedirect();
    }
  }, [countdown, redirect]);

  const handleRedirect = () => {
    if (redirect) {
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = redirect.targetUrl;
      }, 500);
    }
  };

  const handleManualRedirect = () => {
    setCountdown(0);
  };

  const handleCancel = () => {
    window.history.back();
  };

  const destination = redirect ? new URL(redirect.targetUrl) : null;
  const redirectError =
    error === "Redirect not found"
      ? "This short link may have expired, been removed, or never existed."
      : error === "Redirect is disabled"
        ? "This short link has been temporarily disabled. Please try again later."
        : error;

  if (error) {
    return (
      <div className="redirect-shell">
        <Helmet>
          <title>Link unavailable | RJRYT</title>
          <meta name="description" content="This quick link is unavailable." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="redirect-grid" aria-hidden="true" />
        <div className="redirect-orb redirect-orb-one" aria-hidden="true" />
        <div className="redirect-orb redirect-orb-two" aria-hidden="true" />

        <div className="redirect-frame">
          <header className="redirect-header">
            <Link to="/" className="redirect-brand" aria-label="RJRYT homepage">
              <span className="redirect-brand-mark">R</span>
              <span>
                RJRYT<span className="redirect-brand-dot">.</span>
              </span>
            </Link>
            <span className="redirect-header-label">QUICK LINKS</span>
          </header>

          <main className="redirect-state-wrap">
            <motion.section
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="redirect-state-card"
              aria-labelledby="redirect-error-title"
            >
              <div className="redirect-state-icon redirect-state-icon-error">
                <AlertTriangle size={25} />
              </div>
              <p className="redirect-eyebrow">LINK UNAVAILABLE</p>
              <h1 id="redirect-error-title">This link hit a dead end.</h1>
              <p className="redirect-state-copy">{redirectError}</p>
              <Button asChild size="lg" className="redirect-primary-button">
                <Link to="/">
                  <Home size={17} />
                  Back to homepage
                  <ArrowRight size={17} />
                </Link>
              </Button>
              <p className="redirect-state-footnote">Check the address and try again.</p>
            </motion.section>
          </main>
          <RedirectFooter />
        </div>
      </div>
    );
  }

  if (!redirect) {
    return (
      <div className="redirect-shell">
        <Helmet>
          <title>Opening quick link | RJRYT</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="redirect-grid" aria-hidden="true" />
        <div className="redirect-orb redirect-orb-one" aria-hidden="true" />
        <div className="redirect-frame">
          <header className="redirect-header">
            <Link to="/" className="redirect-brand" aria-label="RJRYT homepage">
              <span className="redirect-brand-mark">R</span>
              <span>
                RJRYT<span className="redirect-brand-dot">.</span>
              </span>
            </Link>
            <span className="redirect-header-label">QUICK LINKS</span>
          </header>
          <main className="redirect-state-wrap">
            <div className="redirect-state-card" role="status" aria-live="polite">
              <div className="redirect-loader" />
              <p className="redirect-eyebrow">PREPARING YOUR LINK</p>
              <h1>One moment.</h1>
              <p className="redirect-state-copy">Checking the destination before you continue.</p>
            </div>
          </main>
          <RedirectFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="redirect-shell">
      <Helmet>
        <title>Redirecting… | Quick Links by RJRYT</title>
        <meta
          name="description"
          content={`You are being redirected to ${destination.hostname}. Please verify the destination before continuing.`}
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="RJRYT" />
        <meta property="og:title" content="Redirecting… | Quick Links by RJRYT" />
        <meta
          property="og:description"
          content={`You are being redirected to ${destination.hostname}.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Redirecting… | Quick Links by RJRYT" />
        <meta
          name="twitter:description"
          content={`You are being redirected to ${destination.hostname}.`}
        />
        <meta httpEquiv="refresh" content={`${countdown};url=${redirect.targetUrl}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://rjryt.com/redirect",
            url: "https://rjryt.com/redirect",
            name: "Redirecting… | Quick Links by RJRYT",
            description: `You are being redirected to ${destination.hostname}.`,
            isPartOf: {
              "@type": "WebSite",
              "@id": "https://rjryt.com/#website",
            },
            publisher: {
              "@type": "Person",
              "@id": "https://rjryt.com/#person",
            },
            potentialAction: {
              "@type": "ViewAction",
              target: redirect.targetUrl,
            },
          })}
        </script>
      </Helmet>

      <div className="redirect-grid" aria-hidden="true" />
      <div className="redirect-orb redirect-orb-one" aria-hidden="true" />
      <div className="redirect-orb redirect-orb-two" aria-hidden="true" />

      <div className="redirect-frame">
        <header className="redirect-header">
          <Link to="/" className="redirect-brand" aria-label="RJRYT homepage">
            <span className="redirect-brand-mark">R</span>
            <span>
              RJRYT<span className="redirect-brand-dot">.</span>
            </span>
          </Link>
          <div className="redirect-header-status">
            <span className="redirect-status-dot" />
            <span>SECURE LINK HANDOFF</span>
          </div>
        </header>

        <main className="redirect-main">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="redirect-intro"
            aria-labelledby="redirect-title"
          >
            <p className="redirect-eyebrow">
              <Sparkles size={14} />A SHORTCUT, JUST FOR YOU
            </p>
            <h1 id="redirect-title">
              Taking you
              <br />
              <span>somewhere good.</span>
            </h1>
            <p className="redirect-intro-copy">
              You’re leaving RJRYT and heading to a link I’ve shared. Take a quick look at the
              destination before you go.
            </p>
            <div className="redirect-trust-note">
              <ShieldCheck size={17} />
              <span>Always check the address before sharing personal information.</span>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="redirect-destination-card"
            aria-label="Redirect destination"
          >
            <div className="redirect-card-topline">
              <span className="redirect-card-label">
                <Link2 size={14} />
                DESTINATION
              </span>
              <span className="redirect-card-index">01 / 01</span>
            </div>

            <div className="redirect-destination">
              <div className="redirect-destination-icon">
                <Globe2 size={22} />
              </div>
              <div className="redirect-destination-info">
                <p className="redirect-destination-title">
                  {redirect.linkInfo.title || destination.hostname}
                </p>
                <p className="redirect-hostname">{destination.hostname}</p>
              </div>
              <ArrowUpRight className="redirect-external-mark" size={20} aria-hidden="true" />
            </div>

            {redirect.linkInfo.description && (
              <p className="redirect-description">{redirect.linkInfo.description}</p>
            )}

            <div className="redirect-url-box">
              <span className="redirect-url-lock">
                <ShieldCheck size={14} />
              </span>
              <span className="redirect-url-text">{redirect.targetUrl}</span>
              <ExternalLink size={15} className="redirect-url-external" aria-hidden="true" />
            </div>

            <div className="redirect-countdown">
              <div className="redirect-countdown-ring" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <circle className="redirect-countdown-track" cx="32" cy="32" r="27" />
                  <circle
                    className="redirect-countdown-progress"
                    cx="32"
                    cy="32"
                    r="27"
                    strokeDasharray={169.65}
                    strokeDashoffset={169.65 * (1 - countdown / 5)}
                  />
                </svg>
                <span>{countdown}</span>
              </div>
              <div className="redirect-countdown-copy" aria-live="polite">
                <span className="redirect-countdown-label">
                  {redirecting ? "Opening destination" : "Automatic redirect"}
                </span>
                <span className="redirect-countdown-detail">
                  {redirecting ? "Please wait a moment…" : `Continuing in ${countdown} seconds`}
                </span>
              </div>
              <Clock3 size={18} className="redirect-clock-icon" aria-hidden="true" />
            </div>

            <div className="redirect-actions">
              {redirecting ? (
                <div className="redirect-opening" role="status">
                  <span className="redirect-opening-spinner" />
                  Sending you on your way…
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleManualRedirect}
                    size="lg"
                    className="redirect-primary-button"
                  >
                    Continue now
                    <ArrowRight size={17} />
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="lg"
                    className="redirect-cancel-button"
                  >
                    <ArrowLeft size={16} />
                    Go back
                  </Button>
                </>
              )}
            </div>
          </motion.section>
        </main>

        <RedirectFooter />
      </div>
    </div>
  );
};

const RedirectFooter = () => (
  <footer className="redirect-footer">
    <span>© {new Date().getFullYear()} RJRYT</span>
    <span className="redirect-footer-separator" />
    <span>Thoughtful links. No surprises.</span>
    <Link to="/" className="redirect-footer-home">
      Home <ArrowUpRight size={13} />
    </Link>
  </footer>
);

export default RedirectPage;
