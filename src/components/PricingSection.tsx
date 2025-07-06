import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic health alerts",
        "Weather notifications",
        "Community access",
        "Basic AI assistance",
        "Basic Pokemon Quests",
        "Free Forever"
      ],
      highlighted: false
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      features: [
        "All Free features",
        "Advanced AI health insights",
        "Personalized recommendations",
        "Priority support",
        "Unlimited challenges",
        "Premium badges"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "All Premium features",
        "Custom API integrations",
        "White-label solution",
        "Dedicated support",
        "Advanced analytics",
        "Multi-location support"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pricing-header"
        >
          <h2 className="pricing-title">Choose Your Adventure Plan</h2>
          <p className="pricing-description">
            Start your health journey with the perfect plan for you
          </p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
            >
              {plan.highlighted && (
                <div className="popular-badge">Most Popular</div>
              )}
              
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="feature-item">
                    <Check className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`plan-button ${plan.highlighted ? 'highlighted' : ''}`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;



