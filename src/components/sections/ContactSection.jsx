import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, User, MessageSquare, Send, CheckCircle, 
  AlertCircle, Github, Youtube, Linkedin, Instagram, 
  Heart, ExternalLink, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';
import {
  getRecaptchaToken,
  isRecaptchaEnabled,
  loadRecaptcha,
} from '@/lib/recaptcha';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isRecaptchaEnabled) {
      loadRecaptcha().catch(() => {
        console.warn('reCAPTCHA could not be loaded.');
      });
    }
  }, []);

  const contactInfo = [
    {
      icon: User,
      label: 'Name',
      value: 'Robin Jr',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Thiruvananthapuram, Kerala',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@rjryt.com',
      color: 'from-purple-500 to-purple-600',
      href: 'mailto:contact@rjryt.com'
    }
  ];

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
      name: "Replit",
      icon: ExternalLink,
      url: "/r/replit",
      color: "hover:text-orange-500",
    },
    {
      name: "Discord",
      icon: MessageSquare,
      url: "/r/discord",
      color: "hover:text-indigo-500",
    },
  ];

  const handleInputChange = (e) => {
    if (!hasStartedForm) {
      trackEvent('form_start', { form_id: 'contact' });
      setHasStartedForm(true);
    }
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const recaptchaToken = await getRecaptchaToken('contact_submit');

      // Create form data for FormSubmit
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('subject', formData.subject || 'Contact from RJRYT Portfolio');
      form.append('message', formData.message);
      form.append('_captcha', 'false');
      if (recaptchaToken) {
        form.append('g-recaptcha-response', recaptchaToken);
      }
      form.append('_next', window.location.origin + '/?message=success'); // Redirect URL
      form.append('_subject', "New message request from your website!");
      form.append('_autoresponse', "Your request was send to the website owner. Wait for the response...🙂");
      form.append('_template', "box");
      form.append('_cc', "rjryt@outlook.com");
      form.append('_honey', "");
      
      const response = await fetch('https://formsubmit.co/krr482002@gmail.com', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        trackEvent('generate_lead', {
          form_id: 'contact',
          captcha_enabled: isRecaptchaEnabled,
        });
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
          variant: "default"
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      trackEvent('form_submit_error', {
        form_id: 'contact',
        captcha_enabled: isRecaptchaEnabled,
      });
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,_hsl(var(--primary)/.12),_transparent_34%),radial-gradient(ellipse_at_85%_10%,_hsl(var(--accent)/.08),_transparent_30%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-primary">Have a good one in mind?</p>
          <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
            Let’s make something useful.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Get in Touch - If you need any help in developing, message me via
            email or contact on Discord
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[.2em] text-accent">Start a conversation</p>
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                Let's Work Together
              </h3>
              <p className="mb-7 max-w-xl leading-relaxed text-muted-foreground">
                I'm always excited to collaborate on new projects and help bring
                your ideas to life. Whether you need a Discord bot, a website,
                or SA-MP development, I'm here to help.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card/55 p-4 backdrop-blur-xl transition-colors hover:border-primary/35"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${info.color} shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {info.label}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                );

                return info.href ? (
                  <a key={info.label} href={info.href}>
                    {content}
                  </a>
                ) : (
                  content
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="mb-4 text-lg font-bold text-foreground">
                Connect With Me
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target='_blank'
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex flex-col items-center justify-between rounded-2xl border border-border bg-card/45 p-4 text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
                      title={social.name}
                    >
                      <IconComponent className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-xs font-medium">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Sponsor Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl border border-rose-500/15 bg-gradient-to-r from-rose-500/[.07] to-card/50 p-6 text-center backdrop-blur-xl"
            >
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">
                Support My Work
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                If you like my projects, consider sponsoring me on GitHub
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-card/50 backdrop-blur-sm border border-red-500/50 text-red-500 hover:bg-red-500"
              >
                <a href="/r/sponsor" target="_blank" rel="noopener noreferrer">
                  <Heart className="w-4 h-4 mr-2" />
                  Sponsor
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="rounded-[1.75rem] border border-border bg-card/60 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl sm:p-8">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[.2em] text-primary">Project inquiry</p>
                  <h3 className="text-2xl font-bold text-foreground">
                Send Message
                  </h3>
                </div>
                <span className="hidden h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary sm:grid"><ArrowUpRight size={20} /></span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-muted-foreground mb-2"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="rounded-xl border-border bg-background/50 transition-colors focus-visible:border-primary focus-visible:ring-primary/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-muted-foreground mb-2"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="rounded-xl border-border bg-background/50 transition-colors focus-visible:border-primary focus-visible:ring-primary/30"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="rounded-xl border-border bg-background/50 transition-colors focus-visible:border-primary focus-visible:ring-primary/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                    className="resize-none rounded-xl border-border bg-background/50 transition-colors focus-visible:border-primary focus-visible:ring-primary/30"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 text-primary-foreground font-semibold py-3 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
