import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Server, 
  Database, 
  Cloud, 
  Shield, 
  Smartphone,
  Zap,
  GitBranch
} from 'lucide-react';

const AboutSection = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      items: ['React.js', 'Vite', 'Next.js (basics)', 'Tailwind CSS', 'ShadCN', 'Material UI']
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'Authentication', 'Rate Limiting']
    },
    {
      category: 'Database',
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      items: ['MongoDB', 'MySQL', 'Redis', 'Mongoose', 'Aggregations', 'Indexing']
    },
    {
      category: 'DevOps & Cloud',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      items: ['AWS (EC2, S3, CloudFront)', 'NGINX', 'CI/CD', 'Docker', 'Linux Server']
    }
  ];

  const specialties = [
    { icon: Smartphone, label: 'PWA Development', desc: 'Offline support, push notifications' },
    { icon: Shield, label: 'Security Expert', desc: 'E2EE, XSS/CSRF protection, secure auth' },
    { icon: Zap, label: 'Performance', desc: 'SEO optimization, fast loading times' },
    { icon: GitBranch, label: 'Best Practices', desc: 'Clean code, scalable architecture' }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-lg text-foreground/90 leading-relaxed">
                Hi 👋 I'm <span className="text-accent font-semibold">RJRYT</span>, a passionate 
                Full-Stack Web Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js).
                I love building scalable, secure, and user-friendly applications that solve real-world problems.
              </p>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-accent mb-3">💻 What I Do</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Develop responsive web apps with React + Tailwind for clean UI/UX</li>
                  <li>• Build robust backends with Node.js & Express, integrating APIs and databases</li>
                  <li>• Optimize apps for SEO, performance, and PWA support</li>
                  <li>• Implement advanced features like real-time chat, push notifications, and encryption</li>
                </ul>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-accent mb-3">🚀 My Focus</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Delivering production-ready applications with best practices</li>
                  <li>• Exploring cloud deployment (AWS, EC2, S3, CloudFront, CI/CD)</li>
                  <li>• Building secure apps with authentication, rate limiting, and E2EE</li>
                </ul>
              </div>

              <p className="text-lg text-foreground/80 leading-relaxed">
                🌱 <span className="text-accent font-medium">Beyond Coding:</span> I enjoy experimenting with new technologies, 
                contributing to open-source projects, and constantly learning better ways to build 
                scalable and modern web solutions.
              </p>
            </div>
          </motion.div>

          {/* Specialties Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {specialties.map((specialty, index) => {
              const IconComponent = specialty.icon;
              return (
                <motion.div
                  key={specialty.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg mb-4">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {specialty.label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {specialty.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skillGroup, index) => {
            const IconComponent = skillGroup.icon;
            return (
              <motion.div
                key={skillGroup.category}
                whileHover={{ scale: 1.02, y: -8 }}
                className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${skillGroup.color} rounded-lg mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{skillGroup.category}</h3>
                <ul className="space-y-1">
                  {skillGroup.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;