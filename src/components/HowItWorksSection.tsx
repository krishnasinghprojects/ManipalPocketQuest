
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Bell, Activity, Trophy } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Play className="step-icon" />,
      title: "Start Quest",
      description: "Create profile and set health goals",
      gradient: "step-gradient-green"
    },
    {
      icon: <Bell className="step-icon" />,
      title: "Get Alerts",
      description: "Receive real-time health notifications",
      gradient: "step-gradient-orange"
    },
    {
      icon: <Activity className="step-icon" />,
      title: "Take Action",
      description: "Follow AI recommendations",
      gradient: "step-gradient-purple"
    },
    {
      icon: <Trophy className="step-icon" />,
      title: "Earn Rewards",
      description: "Complete challenges and unlock badges",
      gradient: "step-gradient-pink"
    }
  ];

  return (
    <section className="how-it-works-section"  style={{
      paddingBottom: '4em',
      margin: '2rem 0' ,
      background: 'var(--background-secondary)',
    }}>
      <div className="how-it-works-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="how-it-works-header"
        >
          <h2 className="how-it-works-title">Your Health Adventure in 4 Steps</h2>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="step-card"
            >
              <div className="step-number">{index + 1}</div>
              <div className={`step-icon-container ${step.gradient}`}>
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
