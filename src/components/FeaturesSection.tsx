
import React from 'react';
import { MapPin, Sun, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="feature-icon" />,
      title: "Real-Time Disease Outbreak Data",
      description: "Stay informed about potential health risks in your area with up-to-date outbreak information.",
      gradient: "feature-gradient-green"
    },
    {
      icon: <Sun className="feature-icon" />,
      title: "Weather Intelligence",
      description: "Plan your outdoor activities safely with intelligent weather forecasts and health recommendations.",
      gradient: "feature-gradient-orange"
    },
    {
      icon: <Bot className="feature-icon" />,
      title: "AI Health Assistance",
      description: "Get personalized health advice and support from our AI assistant, tailored to your unique needs and goals.",
      gradient: "feature-gradient-purple"
    }
  ];

  return (
    <section className="features-section"  style={{
      borderBottom: '2.5px solid transparent',
      padding: '2em',
      background: 'var(--background-secondary)',
      marginBottom:'0px'
    }}>
      <div className="features-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="features-header"
        >
          <h2 className="features-title">Key Features</h2>
          <p className="features-description">
            Discover how Manipal PokeQuest combines cutting-edge technology with engaging gameplay 
            to enhance your health and well-being.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="feature-card-content">
                {/* Icon */}
                <div className={`feature-icon-container ${feature.gradient}`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
