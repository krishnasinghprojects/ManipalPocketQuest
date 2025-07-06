
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      avatar: "👩‍⚕️",
      role: "Healthcare Worker",
      rating: 5,
              text: "Manipal PokeQuest helped me stay informed about health risks in my community. The real-time alerts are incredibly valuable for my work."
    },
    {
      name: "Mike Rodriguez",
      avatar: "🏃‍♂️",
      role: "Fitness Enthusiast",
      rating: 5,
      text: "The gamification aspect makes health tracking fun! I've improved my daily habits thanks to the challenge system."
    },
    {
      name: "Dr. Patel",
      avatar: "👨‍⚕️",
      role: "Medical Professional",
      rating: 5,
              text: "As a doctor, I appreciate how Manipal PokeQuest educates patients about health risks in an engaging, accessible way."
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="testimonials-header"
        >
          <h2 className="testimonials-title">Health Heroes Share Their Stories</h2>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="testimonial-card"
            >
              <div className="testimonial-content">
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
