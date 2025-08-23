import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorPage = ({ message = "Something went wrong!", status = 500 }) => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      `${status} Error: An error occurred on route:`,
      location.pathname,
      "Message:",
      message
    );
  }, [location.pathname, status, message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center glass-card p-8 rounded-2xl max-w-md mx-4"
      >
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-5xl font-bold gradient-text mb-4">{status}</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Oops! An Error Occurred
        </h2>
        <p className="text-foreground/70 mb-8">{message}</p>
        <div className="flex justify-center">
          <Button asChild className="bg-primary-gradient hover:shadow-primary">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go Back Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
