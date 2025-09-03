import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Clock, Shield } from 'lucide-react';
import { performRedirect } from '@/utils/redirects';
import { Button } from '@/components/ui/button';

const RedirectPage = () => {
  const { key } = useParams();
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!key) {
      setError('Invalid redirect key');
      return;
    }

    try {
      // Get redirect information (without performing the redirect yet)
      const targetUrl = performRedirect(key);
      setRedirect({
        key,
        targetUrl,
        title: `Redirecting to ${new URL(targetUrl).hostname}`,
        description: 'You will be redirected automatically in a few seconds.'
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
      // Add a small delay to show the redirecting state
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center">
        <Helmet>
          <title>Redirect Error - RJRYT</title>
          <meta name="description" content="Redirect link not found or disabled." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 rounded-2xl text-center max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Redirect Not Found
          </h1>
          
          <p className="text-foreground/70 mb-6">
            {error === 'Redirect not found' 
              ? 'This redirect link does not exist or may have been removed.'
              : error === 'Redirect is disabled'
              ? 'This redirect link has been temporarily disabled.'
              : error}
          </p>
          
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary to-accent"
          >
            Return to Homepage
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!redirect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70">Loading redirect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center">
      <Helmet>
        <title>Redirects | Quick Links by RJRYT</title>
        <meta
          name="description"
          content="Custom redirect links managed by RJRYT for easy navigation. Example: /r/ncrp redirects to NCRP website."
        />
        <meta
          name="keywords"
          content="redirect links, custom redirects, RJRYT"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta property="og:title" content="Redirects | Quick Links by RJRYT" />
        <meta
          property="og:description"
          content="Custom redirect links managed by RJRYT for easy navigation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RJRYT Portfolio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Redirects | Quick Links by RJRYT" />
        <meta
          name="twitter:description"
          content="Custom redirect links managed by RJRYT for easy navigation."
        />

        {/* Automatic redirect meta tag as fallback */}
        <meta
          httpEquiv="refresh"
          content={`${countdown};url=${redirect.targetUrl}`}
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 lg:p-12 rounded-2xl text-center max-w-lg mx-auto"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6"
        >
          {redirecting ? (
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <ExternalLink className="w-10 h-10 text-white" />
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-4">
            {redirecting ? "Redirecting..." : "You're being redirected"}
          </h1>

          <p className="text-foreground/70 mb-2">
            Destination:{" "}
            <strong className="text-foreground">
              {new URL(redirect.targetUrl).hostname}
            </strong>
          </p>

          <p className="text-foreground/60 text-sm mb-8 wrap-anywhere">
            {redirect.targetUrl}
          </p>

          {!redirecting && (
            <>
              {/* Countdown */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-lg font-semibold text-foreground">
                  Redirecting in {countdown} seconds
                </span>
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: `${(countdown / 5) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleManualRedirect}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 group"
                >
                  Continue Now
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="lg"
                  className="glass border-primary/50 text-primary hover:bg-primary/10"
                >
                  Cancel
                </Button>
              </div>

              {/* Safety Notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-accent mb-1">
                      Safety Notice
                    </h3>
                    <p className="text-xs text-foreground/60">
                      You are being redirected to an external website. Please
                      verify the URL before entering any personal information.
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {redirecting && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-foreground/70"
            >
              Please wait while we redirect you to your destination...
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RedirectPage;