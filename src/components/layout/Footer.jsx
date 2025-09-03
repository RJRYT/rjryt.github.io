import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Github, Youtube, Linkedin, Instagram, 
  MessageCircle, ExternalLink, ArrowUp, Code
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Projects', href: '#projects' }
    ],
    'Services': [
      { name: 'Bot Development', href: '#services' },
      { name: 'Web Development', href: '#services' },
      { name: 'SA-MP Development', href: '#services' },
      { name: 'Frontend Design', href: '#services' }
    ],
    'Connect': [
      { name: 'Contact', href: '#contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Team', href: '#team' },
      { name: 'Skills', href: '#skills' }
    ]
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "/r/github",
      color: "hover:text-gray-400",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "/r/youtube",
      color: "hover:text-red-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "/r/linkedin",
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "/r/instagram",
      color: "hover:text-pink-500",
    },
    {
      name: "Discord",
      icon: MessageCircle,
      url: "/r/discord",
      color: "hover:text-indigo-500",
    },
    {
      name: "Replit",
      icon: ExternalLink,
      url: "/r/replit",
      color: "hover:text-orange-500",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <footer className="relative bg-background border-t border-border">
      {/* Decorative Top Border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>

      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              RJRYT OFFICIAL
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Discover the portfolio of RJRYT, a MERN stack web developer
              building scalable and modern applications. Explore projects,
              blogs, and services.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.button
                    key={social.name}
                    onClick={() => handleSocialClick(social.url)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-card hover:bg-auto border ${social.color} border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300`}
                    title={social.name}
                  >
                    <IconComponent size={18} />
                  </motion.button>
                );
              })}
            </div>

            {/* Sponsor Button */}
            <motion.a
              href="/r/sponsor"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-card hover:bg-auto border border-border px-4 py-2 rounded-lg text-red-500 hover:border-red-500/50 transition-all duration-300 text-sm font-medium"
            >
              <Heart size={16} />
              Sponsor Me
            </motion.a>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                    >
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card border border-border p-6 rounded-2xl mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Stay Updated
              </h4>
              <p className="text-muted-foreground text-sm">
                Get notified about new projects, blog posts, and development
                updates
              </p>
            </div>
            <div className="text-center">
              <motion.button
                onClick={() => handleLinkClick("/#contact")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Get in Touch
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Code size={16} />
              <span>
                © {currentYear} RJRYT OFFICIAL. Made with{" "}
                <Heart size={14} className="inline text-red-500 mx-1" />
                in Kerala, India
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <span className="text-sm text-muted-foreground">
                Built with React + Vite + Tailwind
              </span>

              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-card hover:bg-background/50 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300"
                title="Back to top"
              >
                <ArrowUp size={18} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;