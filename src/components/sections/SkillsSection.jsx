import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Database,
  Cloud,
  Shield,
  Terminal,
  Zap,
  Figma,
} from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'Responsive Design', level: 90 },
        { name: 'PWA Development', level: 85 }
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 90 },
        { name: 'REST APIs', level: 95 },
        { name: 'WebSockets', level: 85 },
        { name: 'Authentication', level: 90 },
        { name: 'API Security', level: 85 }
      ]
    },
    {
      title: 'Database Management',
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      skills: [
        { name: 'MongoDB', level: 90 },
        { name: 'MySQL', level: 85 },
        { name: 'Redis', level: 80 },
        { name: 'Mongoose ODM', level: 90 },
        { name: 'Database Design', level: 85 },
        { name: 'Query Optimization', level: 80 }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'AWS (EC2, S3)', level: 80 },
        { name: 'NGINX', level: 85 },
        { name: 'CI/CD', level: 80 },
        { name: 'Docker', level: 75 },
        { name: 'Linux Server', level: 85 },
        { name: 'GitHub Actions', level: 80 }
      ]
    }
  ];

  const tools = [
    { name: "Git & GitHub", icon: Terminal },
    { name: "VS Code", icon: Code2 },
    { name: "Postman", icon: Zap },
    { name: "Figma", icon: Figma },
  ];

  const securityFeatures = [
    'End-to-End Encryption (RSA)',
    'JWT Authentication',
    'OAuth Integration',
    'XSS/CSRF Protection',
    'Rate Limiting',
    'CORS Hardening'
  ];

  return (
    <section
      id="skills"
      className="py-20 relative bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across the full web development stack
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-xl"
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg mr-4`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: categoryIndex * 0.2 + skillIndex * 0.1,
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Security & Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-xl"
          >
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Security Expertise
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center p-3 bg-background/50 rounded-lg"
                >
                  <Shield className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools & Workflow */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-xl"
          >
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-4">
                <Figma className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Tools & Workflow
              </h3>
            </div>

            <div className="space-y-4 mb-6">
              {tools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center p-4 bg-background/50 rounded-lg cursor-pointer hover:bg-background/60 transition-colors"
                  >
                    <IconComponent className="w-5 h-5 text-accent mr-3" />
                    <span className="font-medium text-foreground">
                      {tool.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">
                Development Philosophy
              </h4>
              <p className="text-sm text-muted-foreground">
                Clean code, scalable architecture, security-first approach, and
                continuous learning
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;