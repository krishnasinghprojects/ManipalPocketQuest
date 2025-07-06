
import React from 'react';
import { motion } from 'framer-motion';

const TechnologySection = () => {
  const technologies = [
    {
      name: "HealthMap API",
      description: "Real-time disease outbreak tracking",
      logo: "🗺️"
    },
    {
      name: "OpenWeatherMap API",
      description: "Weather intelligence for health",
      logo: "🌤️"
    },
    {
      name: "Medical AI APIs",
      description: "Intelligent health assistance",
      logo: "🤖"
    },
    {
      name: "Google Maps API",
      description: "Location-based services",
      logo: "📍"
    }
  ];

  return (
    <section className="technology-section" style={{
      background: 'var(--background-secondary)',
    }}>
      <div className="technology-container" >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="technology-header"
        >
          <h2 className="technology-title">Powered by Advanced APIs</h2>
          <p className="technology-description">
            Built on cutting-edge technology stack for reliable health data
          </p>
        </motion.div>

        <div className="technology-grid">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="technology-card"
            >
              <div className="tech-logo">{tech.logo}</div>
              <h3 className="tech-name">{tech.name}</h3>
              <p className="tech-description">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="architecture-info"
        >
          <div className="architecture-badge">
            <span>🏗️ GraphQL Architecture</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;
